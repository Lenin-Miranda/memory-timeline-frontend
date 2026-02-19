import { createContext, useContext, useReducer, useCallback } from "react";
import { memoryService } from "../services/memoryService";

const MemoryContext = createContext();

const initialState = {
  memories: [],
  currentMemory: null,
  loading: false,
  error: null,
};

const memoryReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload, error: null };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_MEMORIES":
      return { ...state, memories: action.payload, loading: false };
    case "SET_CURRENT_MEMORY":
      return { ...state, currentMemory: action.payload, loading: false };
    case "ADD_MEMORY":
      return {
        ...state,
        memories: [...state.memories, action.payload],
        loading: false,
      };
    case "UPDATE_MEMORY":
      return {
        ...state,
        memories: state.memories.map((memory) =>
          memory.id === action.payload.id ? action.payload : memory,
        ),
        currentMemory:
          state.currentMemory?.id === action.payload.id
            ? action.payload
            : state.currentMemory,
        loading: false,
      };
    case "DELETE_MEMORY":
      return {
        ...state,
        memories: state.memories.filter(
          (memory) => memory.id !== action.payload,
        ),
        currentMemory:
          state.currentMemory?.id === action.payload
            ? null
            : state.currentMemory,
        loading: false,
      };
    case "CLEAR_MEMORIES":
      return { ...state, memories: [], currentMemory: null };
    default:
      return state;
  }
};

export const MemoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(memoryReducer, initialState);

  const fetchMemoriesByTimeline = useCallback(async (timelineId) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await memoryService.getMemoriesByTimeline(timelineId);
      // Manejar si la respuesta es { memories: [...] } o directamente [...]
      const memories = response.memories || response;
      dispatch({
        type: "SET_MEMORIES",
        payload: Array.isArray(memories) ? memories : [],
      });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  }, []);

  const fetchMemoryById = useCallback(async (id) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await memoryService.getMemoryById(id);
      const memory = response.memory || response;
      dispatch({ type: "SET_CURRENT_MEMORY", payload: memory });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  }, []);

  const createMemory = useCallback(async (timelineId, memoryData) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await memoryService.createMemory(timelineId, memoryData);
      // Manejar si la respuesta es { memory: {...} } o directamente {...}
      const newMemory = response.memory || response;
      dispatch({ type: "ADD_MEMORY", payload: newMemory });
      return newMemory;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  }, []);

  const updateMemory = useCallback(async (id, memoryData) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const updatedMemory = await memoryService.updateMemory(id, memoryData);
      dispatch({ type: "UPDATE_MEMORY", payload: updatedMemory });
      return updatedMemory;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  }, []);

  const deleteMemory = useCallback(async (id) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await memoryService.deleteMemory(id);
      dispatch({ type: "DELETE_MEMORY", payload: id });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  }, []);

  const clearMemories = useCallback(() => {
    dispatch({ type: "CLEAR_MEMORIES" });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: "SET_ERROR", payload: null });
  }, []);

  const setCurrentMemory = useCallback((memory) => {
    dispatch({ type: "SET_CURRENT_MEMORY", payload: memory });
  }, []);

  const value = {
    ...state,
    fetchMemoriesByTimeline,
    fetchMemoryById,
    createMemory,
    updateMemory,
    deleteMemory,
    clearMemories,
    clearError,
    setCurrentMemory,
  };

  return (
    <MemoryContext.Provider value={value}>{children}</MemoryContext.Provider>
  );
};

export const useMemory = () => {
  const context = useContext(MemoryContext);
  if (!context) {
    throw new Error("useMemory must be used within a MemoryProvider");
  }
  return context;
};

export default MemoryContext;

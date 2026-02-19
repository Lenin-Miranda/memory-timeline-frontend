import { createContext, useContext, useReducer, useCallback } from "react";
import { timelineService } from "../services/timelineService";

const TimelineContext = createContext();

const initialState = {
  timelines: [],
  currentTimeline: null,
  loading: false,
  error: null,
};

const timelineReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload, error: null };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_TIMELINES":
      return { ...state, timelines: action.payload, loading: false };
    case "SET_CURRENT_TIMELINE":
      return { ...state, currentTimeline: action.payload, loading: false };
    case "ADD_TIMELINE":
      return {
        ...state,
        timelines: [...state.timelines, action.payload],
        loading: false,
      };
    case "UPDATE_TIMELINE":
      return {
        ...state,
        timelines: state.timelines.map((timeline) =>
          timeline.id === action.payload.id ? action.payload : timeline,
        ),
        currentTimeline:
          state.currentTimeline?.id === action.payload.id
            ? action.payload
            : state.currentTimeline,
        loading: false,
      };
    case "DELETE_TIMELINE":
      return {
        ...state,
        timelines: state.timelines.filter(
          (timeline) => timeline.id !== action.payload,
        ),
        currentTimeline:
          state.currentTimeline?.id === action.payload
            ? null
            : state.currentTimeline,
        loading: false,
      };
    case "CLEAR_CURRENT_TIMELINE":
      return { ...state, currentTimeline: null };
    default:
      return state;
  }
};

export const TimelineProvider = ({ children }) => {
  const [state, dispatch] = useReducer(timelineReducer, initialState);

  const fetchTimelines = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const timelines = await timelineService.getTimelines();
      dispatch({ type: "SET_TIMELINES", payload: timelines });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  }, []);

  const fetchTimelineById = useCallback(async (id) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const timeline = await timelineService.getTimelineById(id);
      dispatch({ type: "SET_CURRENT_TIMELINE", payload: timeline });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  }, []);

  const createTimeline = useCallback(async (timelineData) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const newTimeline = await timelineService.createTimeline(timelineData);
      dispatch({ type: "ADD_TIMELINE", payload: newTimeline });
      return newTimeline;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  }, []);

  const updateTimeline = useCallback(async (id, timelineData) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const updatedTimeline = await timelineService.updateTimeline(
        id,
        timelineData,
      );
      dispatch({ type: "UPDATE_TIMELINE", payload: updatedTimeline });
      return updatedTimeline;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  }, []);

  const deleteTimeline = useCallback(async (id) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await timelineService.deleteTimeline(id);
      dispatch({ type: "DELETE_TIMELINE", payload: id });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: "SET_ERROR", payload: null });
  }, []);

  const setCurrentTimeline = useCallback((timeline) => {
    dispatch({ type: "SET_CURRENT_TIMELINE", payload: timeline });
  }, []);

  const clearCurrentTimeline = useCallback(() => {
    dispatch({ type: "CLEAR_CURRENT_TIMELINE" });
  }, []);

  const value = {
    ...state,
    fetchTimelines,
    fetchTimelineById,
    createTimeline,
    updateTimeline,
    deleteTimeline,
    clearError,
    setCurrentTimeline,
    clearCurrentTimeline,
  };

  return (
    <TimelineContext.Provider value={value}>
      {children}
    </TimelineContext.Provider>
  );
};

export const useTimeline = () => {
  const context = useContext(TimelineContext);
  if (!context) {
    throw new Error("useTimeline must be used within a TimelineProvider");
  }
  return context;
};

export default TimelineContext;

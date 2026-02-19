import { createContext, useContext, useReducer, useCallback } from "react";
import { timelineService } from "../services/timelineService";
import { memoryService } from "../services/memoryService";

const AppContext = createContext();

const initialState = {
  user: null,
  settings: {
    theme: "light",
    language: "en",
  },
  notifications: [],
  isOnline: true,
  loading: false,
  error: null,
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_SETTINGS":
      return { ...state, settings: { ...state.settings, ...action.payload } };
    case "SET_ONLINE_STATUS":
      return { ...state, isOnline: action.payload };
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload,
        ),
      };
    case "CLEAR_NOTIFICATIONS":
      return { ...state, notifications: [] };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setLoading = useCallback((loading) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  }, []);

  const setError = useCallback((error) => {
    dispatch({ type: "SET_ERROR", payload: error });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: "CLEAR_ERROR" });
  }, []);

  const setUser = useCallback((user) => {
    dispatch({ type: "SET_USER", payload: user });
  }, []);

  const updateSettings = useCallback((settings) => {
    dispatch({ type: "SET_SETTINGS", payload: settings });
  }, []);

  const setOnlineStatus = useCallback((isOnline) => {
    dispatch({ type: "SET_ONLINE_STATUS", payload: isOnline });
  }, []);

  const addNotification = useCallback((notification) => {
    const id = Date.now().toString();
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: { ...notification, id },
    });

    // Auto remove notification after 5 seconds
    setTimeout(() => {
      dispatch({ type: "REMOVE_NOTIFICATION", payload: id });
    }, 5000);
  }, []);

  const removeNotification = useCallback((id) => {
    dispatch({ type: "REMOVE_NOTIFICATION", payload: id });
  }, []);

  const clearNotifications = useCallback(() => {
    dispatch({ type: "CLEAR_NOTIFICATIONS" });
  }, []);

  // Error boundary for API calls
  const handleApiError = useCallback(
    (error, showNotification = true) => {
      const errorMessage = error.message || "An unexpected error occurred";
      setError(errorMessage);

      if (showNotification) {
        addNotification({
          type: "error",
          message: errorMessage,
          title: "Error",
        });
      }
    },
    [setError, addNotification],
  );

  // Success notification helper
  const showSuccess = useCallback(
    (message, title = "Success") => {
      addNotification({
        type: "success",
        message,
        title,
      });
    },
    [addNotification],
  );

  const value = {
    ...state,
    setLoading,
    setError,
    clearError,
    setUser,
    updateSettings,
    setOnlineStatus,
    addNotification,
    removeNotification,
    clearNotifications,
    handleApiError,
    showSuccess,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export default AppContext;

import { memoryService } from "../services/memoryService";
import { timelineService } from "../services/timelineService";
import { useApp } from "../contexts/AppContext";
import { useCallback } from "react";

export const useMemoryActions = () => {
  const { handleApiError, showSuccess } = useApp();

  const createMemoryWithNotification = useCallback(
    async (timelineId, memoryData) => {
      try {
        const result = await memoryService.createMemory(timelineId, memoryData);
        showSuccess("Memory created successfully");
        return result;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },
    [handleApiError, showSuccess],
  );

  const updateMemoryWithNotification = useCallback(
    async (id, memoryData) => {
      try {
        const result = await memoryService.updateMemory(id, memoryData);
        showSuccess("Memory updated successfully");
        return result;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },
    [handleApiError, showSuccess],
  );

  const deleteMemoryWithNotification = useCallback(
    async (id) => {
      try {
        const result = await memoryService.deleteMemory(id);
        showSuccess("Memory deleted successfully");
        return result;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },
    [handleApiError, showSuccess],
  );

  return {
    ...memoryService,
    createMemoryWithNotification,
    updateMemoryWithNotification,
    deleteMemoryWithNotification,
  };
};

export const useTimelineActions = () => {
  const { handleApiError, showSuccess } = useApp();

  const createTimelineWithNotification = useCallback(
    async (timelineData) => {
      try {
        const result = await timelineService.createTimeline(timelineData);
        showSuccess("Timeline created successfully");
        return result;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },
    [handleApiError, showSuccess],
  );

  const updateTimelineWithNotification = useCallback(
    async (id, timelineData) => {
      try {
        const result = await timelineService.updateTimeline(id, timelineData);
        showSuccess("Timeline updated successfully");
        return result;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },
    [handleApiError, showSuccess],
  );

  const deleteTimelineWithNotification = useCallback(
    async (id) => {
      try {
        const result = await timelineService.deleteTimeline(id);
        showSuccess("Timeline deleted successfully");
        return result;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },
    [handleApiError, showSuccess],
  );

  return {
    ...timelineService,
    createTimelineWithNotification,
    updateTimelineWithNotification,
    deleteTimelineWithNotification,
  };
};

export const useAPI = () => {
  return {
    timelines: timelineService,
    memories: memoryService,
  };
};

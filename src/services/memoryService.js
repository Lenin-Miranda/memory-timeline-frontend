const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const memoryService = {
  async getMemoriesByTimeline(timelineId) {
    const response = await fetch(
      `${API_BASE_URL}/timelines/${timelineId}/memories`,
    );
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Error fetching memories");
    }
    return response.json();
  },

  async getMemoryById(id) {
    const response = await fetch(`${API_BASE_URL}/memories/${id}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Memory not found");
    }
    return response.json();
  },

  async createMemory(timelineId, memoryData) {
    const response = await fetch(
      `${API_BASE_URL}/timelines/${timelineId}/memories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memoryData),
      },
    );
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Error creating memory");
    }
    const result = await response.json();
    return result.memory;
  },

  async updateMemory(id, memoryData) {
    const response = await fetch(`${API_BASE_URL}/memories/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memoryData),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Error updating memory");
    }
    const result = await response.json();
    return result.updatedMemory;
  },

  async deleteMemory(id) {
    const response = await fetch(`${API_BASE_URL}/memories/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Error deleting memory");
    }
    const result = await response.json();
    return result.deletedMemory;
  },
};

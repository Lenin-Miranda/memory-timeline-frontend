const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const timelineService = {
  async getTimelines() {
    const response = await fetch(`${API_BASE_URL}/timelines`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Error fetching timelines");
    }
    return response.json();
  },

  async getTimelineById(id) {
    const response = await fetch(`${API_BASE_URL}/timelines/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Timeline not found");
    }
    return response.json();
  },

  async createTimeline(timelineData) {
    const response = await fetch(`${API_BASE_URL}/timelines`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(timelineData),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Error creating timeline");
    }
    return response.json();
  },

  async updateTimeline(id, timelineData) {
    const response = await fetch(`${API_BASE_URL}/timelines/${id}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(timelineData),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Error updating timeline");
    }
    const result = await response.json();
    return result.updatedTimeline;
  },

  async deleteTimeline(id) {
    const response = await fetch(`${API_BASE_URL}/timelines/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Error deleting timeline");
    }
    const result = await response.json();
    return result.deletedTimeline;
  },
};

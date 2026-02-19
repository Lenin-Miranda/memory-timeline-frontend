const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const timelineService = {
  async getTimelines() {
    const response = await fetch(`${API_BASE_URL}/timelines`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Error fetching timelines");
    }
    return response.json();
  },

  async getTimelineById(id) {
    const response = await fetch(`${API_BASE_URL}/timelines/${id}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Timeline not found");
    }
    return response.json();
  },

  async createTimeline(timelineData) {
    const response = await fetch(`${API_BASE_URL}/timelines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        "Content-Type": "application/json",
      },
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
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Error deleting timeline");
    }
    const result = await response.json();
    return result.deletedTimeline;
  },
};

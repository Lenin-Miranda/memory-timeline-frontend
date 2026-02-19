export const API_ENDPOINTS = {
  // Timeline endpoints
  TIMELINES: "/timelines",
  TIMELINE_BY_ID: (id) => `/timelines/${id}`,

  // Memory endpoints
  MEMORIES_BY_TIMELINE: (timelineId) => `/timelines/${timelineId}/memories`,
  MEMORY_BY_ID: (id) => `/memories/${id}`,
};

export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

export const LANGUAGES = {
  EN: "en",
  ES: "es",
};

export const LOCAL_STORAGE_KEYS = {
  THEME: "memory-timeline-theme",
  LANGUAGE: "memory-timeline-language",
  USER_PREFERENCES: "memory-timeline-user-preferences",
};

export const VALIDATION_RULES = {
  REQUIRED: "This field is required",
  MIN_LENGTH: (min) => `Minimum length is ${min} characters`,
  MAX_LENGTH: (max) => `Maximum length is ${max} characters`,
  INVALID_DATE: "Please enter a valid date",
  INVALID_URL: "Please enter a valid URL",
};

export const DATE_FORMATS = {
  DISPLAY: "MMM DD, YYYY",
  INPUT: "YYYY-MM-DD",
  FULL: "MMMM DD, YYYY",
};

export const RELATIONSHIP_TYPES = [
  "Family",
  "Friend",
  "Romantic Partner",
  "Colleague",
  "Pet",
  "Other",
];

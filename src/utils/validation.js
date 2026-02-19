export const validateRequired = (value) => {
  if (!value || (typeof value === "string" && value.trim() === "")) {
    throw new Error("This field is required");
  }
};

export const validateMinLength = (min) => (value) => {
  if (value && value.length < min) {
    throw new Error(`Minimum length is ${min} characters`);
  }
};

export const validateMaxLength = (max) => (value) => {
  if (value && value.length > max) {
    throw new Error(`Maximum length is ${max} characters`);
  }
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    throw new Error("Please enter a valid email address");
  }
};

export const validateUrl = (url) => {
  try {
    if (url) {
      new URL(url);
    }
  } catch {
    throw new Error("Please enter a valid URL");
  }
};

export const validateDate = (date) => {
  if (date) {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new Error("Please enter a valid date");
    }
  }
};

export const validateFutureDate = (date) => {
  if (date) {
    const parsedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (parsedDate > today) {
      throw new Error("Date cannot be in the future");
    }
  }
};

export const timelineValidation = {
  personName: (value) => {
    validateRequired(value);
    validateMinLength(2)(value);
    validateMaxLength(50)(value);
  },
  relationshipType: (value) => {
    validateRequired(value);
    validateMinLength(2)(value);
    validateMaxLength(30)(value);
  },
};

export const memoryValidation = {
  text: (value) => {
    validateRequired(value);
    validateMinLength(5)(value);
    validateMaxLength(1000)(value);
  },
  date: (value) => {
    validateRequired(value);
    validateDate(value);
    validateFutureDate(value);
  },
  imageUrl: (value) => {
    if (value) {
      validateUrl(value);
    }
  },
};

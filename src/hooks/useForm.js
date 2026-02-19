import { useState, useCallback } from "react";

export const useForm = (initialValues = {}, validationSchema = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = useCallback(
    (fieldName, value) => {
      if (validationSchema[fieldName]) {
        try {
          validationSchema[fieldName](value);
          return null;
        } catch (error) {
          return error.message;
        }
      }
      return null;
    },
    [validationSchema],
  );

  const validateAll = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(values).forEach((field) => {
      const error = validate(field, values[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validate]);

  const handleChange = useCallback(
    (field, value) => {
      setValues((prev) => ({ ...prev, [field]: value }));

      // Validate immediately to update isValid
      const error = validate(field, value);
      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }));

      if (touched[field]) {
        // Only show error if field has been touched
      }
    },
    [touched, validate],
  );

  const handleBlur = useCallback(
    (field) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const error = validate(field, values[field]);
      setErrors((prev) => ({ ...prev, [field]: error }));
    },
    [values, validate],
  );

  const handleSubmit = useCallback(
    async (onSubmit) => {
      setIsSubmitting(true);
      const isValid = validateAll();

      if (isValid && onSubmit) {
        try {
          await onSubmit(values);
        } catch (error) {
          console.error("Form submission error:", error);
        }
      }

      setIsSubmitting(false);
      return isValid;
    },
    [values, validateAll],
  );

  const reset = useCallback(
    (newValues = initialValues) => {
      setValues(newValues);
      setErrors({});
      setTouched({});
      setIsSubmitting(false);
    },
    [initialValues],
  );

  const setFieldValue = useCallback((field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const setFieldError = useCallback((field, error) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue,
    setFieldError,
    validateAll,
    isValid:
      Object.keys(errors).filter((key) => errors[key] !== null).length === 0,
  };
};

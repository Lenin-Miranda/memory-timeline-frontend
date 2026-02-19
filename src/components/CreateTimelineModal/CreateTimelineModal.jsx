import { useState } from "react";
import Modal from "../Modal/Modal";
import { useForm } from "../../hooks/useForm";
import { useTimeline } from "../../contexts/TimelineContext";
import { timelineValidation } from "../../utils/validation";
import { RELATIONSHIP_TYPES } from "../../constants";

const CreateTimelineModal = ({ isOpen, onClose }) => {
  const { createTimeline, loading } = useTimeline();
  const [submitError, setSubmitError] = useState("");

  const initialValues = {
    personName: "",
    relationshipType: "",
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    isValid,
  } = useForm(initialValues, timelineValidation);

  const onSubmit = async (formValues) => {
    try {
      setSubmitError("");
      await createTimeline(formValues);
      reset();
      onClose();
    } catch (error) {
      setSubmitError(error.message || "Failed to create timeline");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit);
  };

  const handleClose = () => {
    reset();
    setSubmitError("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Timeline">
      <form onSubmit={handleFormSubmit} className="modal__form">
        <div className="form-group">
          <label htmlFor="personName" className="form-label">
            Person Name *
          </label>
          <input
            id="personName"
            type="text"
            className={`form-input ${
              touched.personName && errors.personName ? "error" : ""
            }`}
            value={values.personName}
            onChange={(e) => handleChange("personName", e.target.value)}
            onBlur={() => handleBlur("personName")}
            placeholder="Enter the person's name"
            disabled={loading || isSubmitting}
          />
          {touched.personName && errors.personName && (
            <span className="form-error">{errors.personName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="relationshipType" className="form-label">
            Relationship Type *
          </label>
          <select
            id="relationshipType"
            className={`form-select ${
              touched.relationshipType && errors.relationshipType ? "error" : ""
            }`}
            value={values.relationshipType}
            onChange={(e) => handleChange("relationshipType", e.target.value)}
            onBlur={() => handleBlur("relationshipType")}
            disabled={loading || isSubmitting}
          >
            <option value="">Select relationship type</option>
            {RELATIONSHIP_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {touched.relationshipType && errors.relationshipType && (
            <span className="form-error">{errors.relationshipType}</span>
          )}
        </div>

        {submitError && (
          <div
            className="form-error"
            style={{ textAlign: "center", marginTop: "1rem" }}
          >
            {submitError}
          </div>
        )}

        <div className="modal__actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClose}
            disabled={loading || isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isValid || loading || isSubmitting}
          >
            {loading || isSubmitting ? "Creating..." : "Create Timeline"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateTimelineModal;

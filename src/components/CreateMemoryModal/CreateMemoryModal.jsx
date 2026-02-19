import { useState } from "react";
import Modal from "../Modal/Modal";
import { useMemory } from "../../contexts/MemoryContext";

const CreateMemoryModal = ({ isOpen, onClose, timelineId, timelineName }) => {
  const { createMemory, loading } = useMemory();
  const [submitError, setSubmitError] = useState("");
  const [values, setValues] = useState({
    text: "",
    date: "",
    imageUrl: "",
  });

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitError("");
      await createMemory(timelineId, values);
      setValues({ text: "", date: "", imageUrl: "" });
      onClose();
    } catch (error) {
      setSubmitError(error.message || "Failed to create memory");
    }
  };

  const handleClose = () => {
    setValues({ text: "", date: "", imageUrl: "" });
    setSubmitError("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Add Memory to "${timelineName}"`}
    >
      <form onSubmit={handleSubmit} className="modal__form">
        <div className="form-group">
          <label htmlFor="text" className="form-label">
            Memory Text *
          </label>
          <textarea
            id="text"
            className="form-input form-textarea"
            value={values.text}
            onChange={(e) => handleChange("text", e.target.value)}
            placeholder="Describe this memory..."
            disabled={loading}
            rows={4}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date" className="form-label">
            Date of Memory *
          </label>
          <input
            id="date"
            type="date"
            className="form-input"
            value={values.date}
            onChange={(e) => handleChange("date", e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl" className="form-label">
            Image URL (optional)
          </label>
          <input
            id="imageUrl"
            type="url"
            className="form-input"
            value={values.imageUrl}
            onChange={(e) => handleChange("imageUrl", e.target.value)}
            placeholder="https://example.com/image.jpg"
            disabled={loading}
          />
          {values.imageUrl && (
            <div className="image-preview">
              <img
                src={values.imageUrl}
                alt="Preview"
                onError={(e) => (e.target.style.display = "none")}
                onLoad={(e) => (e.target.style.display = "block")}
              />
            </div>
          )}
        </div>

        {submitError && <div className="form-error-message">{submitError}</div>}

        <div className="modal__actions">
          <button
            type="button"
            className="btn btn--secondary"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn--primary"
            disabled={loading || !values.text || !values.date}
          >
            {loading ? "Creating..." : "Add Memory"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateMemoryModal;

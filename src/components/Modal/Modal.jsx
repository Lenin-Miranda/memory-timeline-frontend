import { useEffect, useRef } from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? "show" : ""}`}>
      <div className="modal" ref={modalRef}>
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <button className="modal__close" onClick={onClose} type="button">
            ×
          </button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

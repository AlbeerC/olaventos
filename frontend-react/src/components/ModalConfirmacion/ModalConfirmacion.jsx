import { useState } from "react";
import "./ModalConfirmacion.css";

function ModalConfirmacion({ isOpen, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <p className="modal-message">{message}</p>
        <div className="modal-buttons">
          <button className="btn-confirm" onClick={onConfirm}>Sí</button>
          <button className="btn-cancel" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmacion;

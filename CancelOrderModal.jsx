import React from "react";

function CancelOrderModal({ isOpen, onClose, onConfirm, warningText }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="cancel-modal">
        <h2>Cancel Order</h2>
        <p className="warning-text">{warningText}</p>

        <div className="terms-list">
          <p>• Custom cakes may have slight variations.</p>
          <p>• Customer must be available at delivery time.</p>
          <p>• No responsibility after delivery.</p>
          <p>• No refunds after order completion/delivery.</p>
        </div>

        <div className="modal-actions">
          <button className="secondary-btn" onClick={onClose}>
            Keep Order
          </button>
          <button className="danger-btn" onClick={onConfirm}>
            Confirm Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CancelOrderModal;

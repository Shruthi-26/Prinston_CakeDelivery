import React from "react";

function OrderStatusCard({
  order,
  onCancel,
  getCancelMessage,
  canCancelOrder
}) {
  const cancelInfo = getCancelMessage(order);
  const canCancel = canCancelOrder(order);

  return (
    <div className="order-status-card">
      <h3>Order #{order.orderNumber || order._id}</h3>

      <div className="status-row">
        <span className="label">Payment Method:</span>
        <span className="value">Cash on Delivery (COD)</span>
      </div>

      <div className="status-row">
        <span className="label">Payment Status:</span>
        <span className={`badge payment ${order.paymentStatus?.toLowerCase()}`}>
          {order.paymentStatus}
        </span>
      </div>

      <div className="status-row">
        <span className="label">Delivery Status:</span>
        <span className={`badge delivery ${order.deliveryStatus?.toLowerCase().replace(/\s+/g, "-")}`}>
          {order.deliveryStatus}
        </span>
      </div>

      <div className="status-row">
        <span className="label">Delivery Time:</span>
        <span className="value">
          {new Date(order.deliveryDate).toLocaleString()}
        </span>
      </div>

      <div className="timeline">
        <div className={`step ${["Preparing", "Out for Delivery", "Delivered"].includes(order.deliveryStatus) ? "active" : ""}`}>
          Preparing
        </div>
        <div className={`step ${["Out for Delivery", "Delivered"].includes(order.deliveryStatus) ? "active" : ""}`}>
          Out for Delivery
        </div>
        <div className={`step ${order.deliveryStatus === "Delivered" ? "active" : ""}`}>
          Delivered
        </div>
      </div>

      <div className="cancel-box">
        <p className={`cancel-message ${canCancel ? "ok" : "no"}`}>
          {cancelInfo}
        </p>

        <button
          className="cancel-btn"
          onClick={() => onCancel(order)}
          disabled={!canCancel}
        >
          Cancel Order
        </button>
      </div>
    </div>
  );
}

export default OrderStatusCard;

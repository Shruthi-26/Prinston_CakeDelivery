import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

function TrackOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const fetchOrder = () => {
    API.get(`/orders/${id}`)
      .then((res) => setOrder(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handleCancel = async () => {
    const confirmed = window.confirm(
      "Cake Order Terms:\n\n1. Custom cakes may have slight variations.\n2. Customer must be available at delivery time.\n3. No responsibility after delivery.\n4. No refunds after order completion/delivery.\n\nDo you want to continue?"
    );

    if (!confirmed) return;

    const reason = prompt("Enter cancellation reason:");
    if (!reason) return;

    try {
      const res = await API.put(`/orders/${id}/cancel`, { reason });
      alert(res.data.message);
      fetchOrder();
    } catch (error) {
      alert(error.response?.data?.message || "Cancellation failed");
    }
  };

  if (!order) {
    return (
      <div className="container">
        <p>Loading order...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Track Order</h1>

      <div className="order-card">
        <h3>{order.orderNumber}</h3>
        <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
        <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
        <p><strong>Delivery Mode:</strong> {order.deliveryMode}</p>
        <p><strong>Delivery Status:</strong> {order.deliveryStatus}</p>
        <p><strong>Delivery Date:</strong> {new Date(order.deliveryDate).toLocaleString()}</p>
        <p><strong>Total:</strong> ₹{order.totalAmount}</p>
        <p><strong>Address / Pickup Note:</strong> {order.address}</p>

        {!order.isCancelled && (
          <p className={`cancel-note ${order.canCancel ? "allowed" : "blocked"}`}>
            {order.message}
          </p>
        )}

        {order.isCancelled && (
          <p><strong>Cancellation Reason:</strong> {order.cancellationReason}</p>
        )}

        {!order.isCancelled && (
          <button onClick={handleCancel} disabled={!order.canCancel}>
            Cancel Order
          </button>
        )}

        <h3>Items</h3>
        {order.items.map((item, index) => (
          <div className="tracking-item" key={index}>
            <img src={item.image} alt={item.title} />
            <div>
              <p><strong>{item.title}</strong></p>
              <p>Qty: {item.quantity}</p>
              <p>Price: ₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrackOrder;

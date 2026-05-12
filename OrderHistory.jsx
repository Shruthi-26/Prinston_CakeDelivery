import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const fetchOrders = () => {
    API.get("/orders/my")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    const confirmed = window.confirm(
      "Cake Order Terms:\n\n1. Custom cakes may have slight variations.\n2. Customer must be available at delivery time.\n3. No responsibility after delivery.\n4. No refunds after order completion/delivery.\n\nDo you want to continue?"
    );

    if (!confirmed) return;

    const reason = prompt("Enter cancellation reason:");
    if (!reason) return;

    try {
      const res = await API.put(`/orders/${orderId}/cancel`, { reason });
      alert(res.data.message);
      setSelectedOrderId(null);
      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message || "Cancellation failed");
    }
  };

  return (
    <div className="container">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <h3>Order No: {order.orderNumber}</h3>
              <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
              <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
              <p><strong>Delivery Mode:</strong> {order.deliveryMode}</p>
              <p><strong>Delivery Status:</strong> {order.deliveryStatus}</p>
              <p><strong>Delivery Date:</strong> {new Date(order.deliveryDate).toLocaleString()}</p>
              <p><strong>Total:</strong> ₹{order.totalAmount}</p>
              <p><strong>Address / Pickup Note:</strong> {order.address}</p>

              {order.isCancelled && (
                <p><strong>Cancellation Reason:</strong> {order.cancellationReason}</p>
              )}

              {!order.isCancelled && (
                <p className={`cancel-note ${order.canCancel ? "allowed" : "blocked"}`}>
                  {order.message}
                </p>
              )}

              <div className="order-actions">
                <Link to={`/orders/${order._id}`}>Track Order</Link>

                {!order.isCancelled && (
                  <button
                    onClick={() => handleCancel(order._id)}
                    disabled={!order.canCancel}
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;

import Order from "../models/Order.js";
import Cake from "../models/Cake.js";

const generateOrderNumber = () => {
  return `ORD-${Date.now()}`;
};

const getCancellationInfo = (order) => {
  if (order.isCancelled) {
    return {
      canCancel: false,
      message: "This order is already cancelled."
    };
  }

  if (
    order.deliveryStatus === "Out for Delivery" ||
    order.deliveryStatus === "Delivered"
  ) {
    return {
      canCancel: false,
      message: "Cancellation is not allowed because the order is already out for delivery or delivered."
    };
  }

  const now = new Date().getTime();
  const deliveryTime = new Date(order.deliveryDate).getTime();
  const hoursLeft = (deliveryTime - now) / (1000 * 60 * 60);

  if (hoursLeft > 48) {
    return {
      canCancel: true,
      message: "Cancellation is allowed because more than 48 hours are left before delivery."
    };
  }

  if (hoursLeft >= 24 && hoursLeft <= 48) {
    return {
      canCancel: true,
      message: "Cancellation is allowed with warning because delivery is within 24 to 48 hours."
    };
  }

  return {
    canCancel: false,
    message: "Cancellation is not allowed because less than 24 hours are left before delivery."
  };
};

export const createOrder = async (req, res) => {
  try {
    const { items, address, deliveryDate } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No order items provided" });
    }

    if (!deliveryDate) {
      return res.status(400).json({ message: "Delivery date is required" });
    }

    const cakeIds = items.map((item) => item.cakeId);
    const cakes = await Cake.find({ _id: { $in: cakeIds } });

    const orderItems = items.map((item) => {
      const cake = cakes.find((c) => c._id.toString() === item.cakeId);

      return {
        cakeId: cake._id,
        title: cake.title,
        image: cake.image,
        quantity: item.quantity || 1,
        price: cake.price
      };
    });

    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      userId: req.user.id,
      orderNumber: generateOrderNumber(),
      items: orderItems,
      totalAmount,
      address,
      paymentMethod: "COD",
      paymentStatus: "Pending",
      deliveryMode: "Pick Up From Store",
      deliveryStatus: "Preparing",
      deliveryDate,
      status: "pending"
    });

    res.status(201).json({
      ...order.toObject(),
      ...getCancellationInfo(order)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });

    const updatedOrders = orders.map((order) => ({
      ...order.toObject(),
      ...getCancellationInfo(order)
    }));

    res.json(updatedOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      ...order.toObject(),
      ...getCancellationInfo(order)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { deliveryStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (deliveryStatus) {
      order.deliveryStatus = deliveryStatus;
    }

    if (deliveryStatus === "Delivered") {
      order.paymentStatus = "Paid";
      order.status = "delivered";
    }

    if (deliveryStatus === "Cancelled") {
      order.status = "cancelled";
      order.isCancelled = true;
    }

    await order.save();

    res.json({
      ...order.toObject(),
      ...getCancellationInfo(order)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { reason } = req.body;

    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const cancelInfo = getCancellationInfo(order);

    if (!cancelInfo.canCancel) {
      return res.status(400).json({ message: cancelInfo.message });
    }

    order.isCancelled = true;
    order.cancellationReason = reason || "Cancelled by customer";
    order.deliveryStatus = "Cancelled";
    order.status = "cancelled";

    await order.save();

    res.json({
      message: "Order cancelled successfully",
      order: {
        ...order.toObject(),
        ...getCancellationInfo(order)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

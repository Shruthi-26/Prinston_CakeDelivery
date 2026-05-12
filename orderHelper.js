export const getHoursLeft = (deliveryDate) => {
  const now = new Date().getTime();
  const delivery = new Date(deliveryDate).getTime();
  return (delivery - now) / (1000 * 60 * 60);
};

export const canCancelOrder = (order) => {
  const hoursLeft = getHoursLeft(order.deliveryDate);

  if (
    order.deliveryStatus === "Out for Delivery" ||
    order.deliveryStatus === "Delivered"
  ) {
    return false;
  }

  if (hoursLeft < 24) {
    return false;
  }

  return true;
};

export const getCancelMessage = (order) => {
  const hoursLeft = getHoursLeft(order.deliveryDate);

  if (
    order.deliveryStatus === "Out for Delivery" ||
    order.deliveryStatus === "Delivered"
  ) {
    return "Cancellation is not allowed because the order is already out for delivery or delivered.";
  }

  if (hoursLeft > 48) {
    return "Cancellation is allowed because more than 48 hours are left before delivery.";
  }

  if (hoursLeft >= 24 && hoursLeft <= 48) {
    return "Cancellation is allowed, but you are within 24–48 hours of delivery. Please review the terms before confirming.";
  }

  return "Cancellation is not allowed because less than 24 hours are left before delivery.";
};

export const getPaymentStatusForCOD = (deliveryStatus) => {
  return deliveryStatus === "Delivered" ? "Paid" : "Pending";
};

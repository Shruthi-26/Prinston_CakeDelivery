import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    items: [
      {
        cakeId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Cake"
        },
        title: String,
        image: String,
        quantity: { type: Number, default: 1 },
        price: Number
      }
    ],
    totalAmount: { type: Number, required: true },
    address: { type: String, required: true },

    paymentMethod: {
      type: String,
      default: "COD"
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending"
    },

    deliveryMode: {
      type: String,
      enum: ["Pick Up From Store"],
      default: "Pick Up From Store"
    },
    deliveryStatus: {
      type: String,
      enum: ["Preparing", "Out for Delivery", "Delivered", "Cancelled"],
      default: "Preparing"
    },

    deliveryDate: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "delivered", "cancelled"],
      default: "pending"
    },

    isCancelled: {
      type: Boolean,
      default: false
    },
    cancellationReason: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);

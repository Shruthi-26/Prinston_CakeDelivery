import mongoose from "mongoose";

const customCakeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    shape: String,
    size: String,
    flavor: String,
    cream: String,
    messageOnCake: String,
    deliveryDate: String,
    designNotes: String,
    imageReference: String,
    status: {
      type: String,
      enum: ["requested", "approved", "in_progress", "completed"],
      default: "requested"
    }
  },
  { timestamps: true }
);

export default mongoose.model("CustomCake", customCakeSchema);

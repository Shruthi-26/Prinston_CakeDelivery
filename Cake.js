import mongoose from "mongoose";

const cakeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: String,
    flavor: String,
    weight: String,
    eggless: { type: Boolean, default: false },
    image: String,
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Cake", cakeSchema);

import Cake from "../models/Cake.js";

export const getCakes = async (req, res) => {
  try {
    const cakes = await Cake.find().populate("sellerId", "name email");
    res.json(cakes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCakeById = async (req, res) => {
  try {
    const cake = await Cake.findById(req.params.id).populate("sellerId", "name email");
    if (!cake) return res.status(404).json({ message: "Cake not found" });
    res.json(cake);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCake = async (req, res) => {
  try {
    const newCake = await Cake.create({
      ...req.body,
      sellerId: req.user.id
    });
    res.status(201).json(newCake);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCake = async (req, res) => {
  try {
    const updatedCake = await Cake.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCake);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCake = async (req, res) => {
  try {
    await Cake.findByIdAndDelete(req.params.id);
    res.json({ message: "Cake deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import CustomCake from "../models/CustomCake.js";

export const createCustomCake = async (req, res) => {
  try {
    const customCake = await CustomCake.create({
      ...req.body,
      userId: req.user.id
    });
    res.status(201).json(customCake);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyCustomCakes = async (req, res) => {
  try {
    const customCakes = await CustomCake.find({ userId: req.user.id });
    res.json(customCakes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

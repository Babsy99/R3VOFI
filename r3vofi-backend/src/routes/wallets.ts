import express from "express";
import Wallet from "../models/Wallet.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const wallets = await Wallet.find({ userId: req.user.id });
    res.json(wallets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching wallets" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { address, name } = req.body;
    const wallet = new Wallet({ userId: req.user.id, address, name });
    await wallet.save();
    res.status(201).json(wallet);
  } catch (error) {
    res.status(500).json({ message: "Error creating wallet" });
  }
});

// Add more routes as needed (update, delete)

export default router;

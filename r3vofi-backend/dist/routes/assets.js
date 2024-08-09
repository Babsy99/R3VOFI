import express from "express";
import Asset from "../models/Asset.js";
import authMiddleware from "../middleware/auth.js";
const router = express.Router();
router.use(authMiddleware);
router.get("/", async (req, res) => {
    try {
        const assets = await Asset.find({ userId: req.user.id });
        res.json(assets);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching assets" });
    }
});
// Add more routes as needed (create, update, delete)
export default router;

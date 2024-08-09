import mongoose from "mongoose";
const assetSchema = new mongoose.Schema({
    walletId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wallet",
        required: true,
    },
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    balance: { type: Number, required: true },
    price: { type: Number, required: true },
    value: { type: Number, required: true },
});
export default mongoose.model("Asset", assetSchema);

import mongoose from 'mongoose';
const walletSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    address: { type: String, required: true },
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
export default mongoose.model('Wallet', walletSchema);

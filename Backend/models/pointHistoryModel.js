import mongoose from 'mongoose'

const pointHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true }, // 👈 जोड़ा गया
  points: { type: Number, required: true },   // 👈 जोड़ा गया
  claimedAt: { type: Date, default: Date.now },
},{timestamps:true});
const pointHistoryModel = mongoose.model("history",pointHistorySchema)
export default pointHistoryModel
import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  totalPoints: { type: Number, default: 0 },
},{timestamps:true});

const userModel = mongoose.model("user",userSchema)
export default userModel
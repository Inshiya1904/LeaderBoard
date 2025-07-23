const { default: pointHistoryModel } = require("../models/pointHistoryModel.js");
const { default: userModel } = require("../models/userModel.js");


// Get all users
exports.getUsers = async (req, res) => {
  const users = await userModel.find().sort({ name: 1 });
  res.json(users);
};

// Add new user
exports.addUser = async (req, res) => {
  const { name } = req.body;
  const user = new userModel({ name });
  await user.save();
  res.status(201).json(user);
};

// delete user

// Claim points
exports.claimPoints = async (req, res) => {
  const { userId } = req.params;
  const points = Math.floor(Math.random() * 10) + 1;

  const user = await userModel.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.totalPoints += points;
  await user.save();

  const history = new pointHistoryModel({
    userId: user._id,
    userName: user.name,
    points,
  });
  await history.save();

  res.json({ message: `${user.name} claimed ${points} points!`, points, totalPoints: user.totalPoints, history });
};

// Get leaderboard (sorted)
exports.getLeaderboard = async (req, res) => {
  const users = await userModel.find().sort({ totalPoints: -1 });
  const ranked = users.map((u, i) => ({
    userId:u._id,
    rank: i + 1,
    name: u.name,
    totalPoints: u.totalPoints,
  }));
  res.json(ranked);
};

// Get claim history
exports.getHistory = async (req, res) => {
  const history = await pointHistoryModel.find().sort({ claimedAt: -1 }).limit(50);
  res.json(history);
};

//  Get history for a specific user by userId
exports.getHistoryByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await pointHistoryModel.find({ userId }).sort({ claimedAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user history', error });
  }
};


//  Clear all history (for testing/admin)
exports.clearHistory = async (req, res) => {
  try {
    await pointHistoryModel.deleteMany({});
    res.json({ message: 'All point claim history deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing history', error });
  }
};

//  Clear one  history (for testing/admin)
exports.DeleteOneHistory = async (req, res) => {
  try {
    const { historyId } = req.params
    const deleteHistory = await pointHistoryModel.findByIdAndDelete(historyId)
    res.json({ message: 'History deleted', data:deleteHistory });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing history', error });
  }
};

//  Clear one user all history (for testing/admin)
exports.DeleteOneUserAllHistory = async (req, res) => {
  try {
    const { userId } = req.params
    console.log(userId)
    const deleteHistory = await pointHistoryModel.deleteMany({userId})
    res.json({ message: 'History deleted', data:deleteHistory });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing history', error });
  }
};

//  Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params
    console.log(userId)
    const deleteHistory = await userModel.findByIdAndDelete(userId)
    res.json({ message: 'User deleted', data:deleteHistory });
  } catch (error) {
    res.status(500).json({ message: 'Error', error });
  }
};
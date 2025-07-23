import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [message, setMessage] = useState("");
  const [newUser, setNewUser] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const BASE_URL = "https://leaderboard-backend-mf4p.onrender.com/api/users";

  const fetchUsers = async () => {
    const res = await axios.get(`${BASE_URL}`);
    setUsers(res.data);
  };

  const claimPoints = async () => {
    if (!selectedUser) return alert("Select a user first");
    const res = await axios.post(`${BASE_URL}/claim/${selectedUser}`);
    setMessage(res.data.message);
    fetchUsers();
    fetchLeaderBoard();
    setSelectedUser("");
  };

  const addUser = async () => {
    if (!newUser) return;
    await axios.post(`${BASE_URL}`, { name: newUser });
    setNewUser("");
    fetchUsers();
    fetchLeaderBoard();
  };

  const fetchLeaderBoard = async () => {
    const res = await axios.get(`${BASE_URL}/leaderboard`);
    setLeaderboard(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    fetchLeaderBoard();
  };

  const handleHistoryView = async (id) => {
    const res = await axios.get(`${BASE_URL}/history/${id}`);
    setHistory(res.data);
    setShowHistory(true);
  };

  useEffect(() => {
    fetchUsers();
    fetchLeaderBoard();
  }, []);

  return (
    <div className="container">
      <h1>Live Ranking</h1>

      <div className="user-selection">
        <select
          onChange={(e) => setSelectedUser(e.target.value)}
          value={selectedUser}
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
        <button onClick={claimPoints}>Claim</button>
      </div>

      <div className="add-user">
        <input
          type="text"
          placeholder="Add New User"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <button onClick={addUser}>Add</button>
      </div>

      {message && <p className="message">{message}</p>}

      <div className="leaderboard">
        <h2>Leaderboard</h2>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Total Points</th>
              <th>Delete</th>
              <th>Point History</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, index) => (
              <tr key={index}>
                <td>{user.rank}</td>
                <td>{user.name}</td>
                <td>{user.totalPoints}</td>
                <td onClick={() => handleDelete(user.userId)}>Delete</td>
                <td onClick={() => handleHistoryView(user.userId)}>View</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="history-board">
        {showHistory && (
          <div className="history-info">
            <h3>{`Reward Points of ${
              history.length > 0 ? history[0].userName : "User"
            }`}</h3>
            {history.length > 0 ? (
              history.map((user, index) => (
                <div key={index}>
                  <p>{user.points}</p>
                </div>
              ))
            ) : (
              <p>No reward history available.</p>
            )}
            <button onClick={() => setShowHistory(false)}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

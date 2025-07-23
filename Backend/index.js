const express = require('express');

const cors = require('cors');
const { connectDB } = require('./config/dbConfig');

const { default: userRouter } = require('./routes/userRoute');
require('dotenv').config();

// const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

connectDB()

app.use('/api/users', userRouter);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

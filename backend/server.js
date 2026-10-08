require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const workoutRoutes = require('./routes/workouts');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/workouts', workoutRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`connected to db & listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
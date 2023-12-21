const mongoose = require("mongoose");
require("dotenv").config();

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDatabase = () => {
    console.log(process.env.MONGODB_URI)
    mongoose.connect('mongodb://127.0.0.1:27017/ngrxusermanagement', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Error connecting to MongoDB:', error));
};

module.exports = { connectToDatabase };

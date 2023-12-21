const express = require("express");
const app = express();
const path = require('path');
require("dotenv").config();
const db = require("./config/connection");


app.use(express.json());
const cors = require("cors");
app.use(cors({ origin: 'http://localhost:4200' }));


// Serve static files from the 'images' directory
app.use('/image', express.static(path.join(__dirname, 'image')));


app.use("/", require("./router/router"));
db.connectToDatabase();
app.listen(3000, () => {
  console.log("listening to port 3000");
});

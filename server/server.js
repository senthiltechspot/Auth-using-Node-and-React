const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

app.use(cors());

// connect to mongo db
async function connectdb() {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_URI, () => {
      console.log("Connected to MongoDB");
    });
  } catch (error) {
    console.log(error);
  }
}
connectdb();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(cookieParser());

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Login Application using Node.js and MongoDB",
  });
});

// Require login routes
require("./Routes/auth.routes.js")(app);

// listen for requests
app.listen(process.env.PORT || 3500, () => {
  console.log(`Server is listening on port ${process.env.PORT || 3500}`);
});

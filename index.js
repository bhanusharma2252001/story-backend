const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const storyRouter = require("./routes/story.router");
const userRouter = require("./routes/user.router");

async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/story-app");
    console.log("db connected!!");
  } catch (error) {
    console.log("error while connection db", error.message);
  }
}

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/story", storyRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  return res.status(200).json({ status: "active" });
});

app.listen(3000, (err) => {
  if (!err) console.log("server is listening on port 3000");
});

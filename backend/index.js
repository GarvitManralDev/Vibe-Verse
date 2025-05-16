const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");
const cors = require("cors");
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const { connectDB } = require("./db");
connectDB();

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Welcome to the VibeVerse backend!");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

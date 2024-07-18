import express from "express";
import dotenv from "dotenv";
import cors from "cors";


// database connection


// Routes



dotenv.config();
// connectDB();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/*", (req, res) => {
  res.send("invalid endpoint!");
});

app.listen(8000, () => {
  console.log("Server is running on port http://localhost:8000/");
});

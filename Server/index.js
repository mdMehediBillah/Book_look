import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./database/index.js";
import authUserRouter from "./routes/authUserRouter.js";
import userRouter from "./routes/userRouter.js";
import bookshelfRouter from "./routes/bookshelfRouter.js";
import bookRouter from "./routes/bookRouter.js";
import commentRouter from "./routes/commentRouter.js";
import genreRouter from "./routes/genreRouter.js";
import ratingRouter from "./routes/ratingRouter.js";

// Import routes

dotenv.config();
// connectDB();

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes
app.use("/api/v1/auth", authUserRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/bookshelves", bookshelfRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/genres", genreRouter);
app.use("/api/v1/ratings", ratingRouter);
// app.use("/api/v1/borrowedBooks", borrowedBookRouter);
// app.use("/api/v1/donatedBooks", donatedBookRouter);

// Invalid endpoint
app.get("/*", (req, res) => {
  res.send("invalid endpoint!");
});

app.listen(8000, () => {
  console.log("Server is running on port http://localhost:8000/");
});

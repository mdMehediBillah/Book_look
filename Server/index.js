import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {
  authUserRouter,
  bookRouter,
  bookshelfRouter,
  borrowedBookRouter,
  commentRouter,
  donatedBookRouter,
  genreRouter,
  ratingRouter,
} from "./routes";


// Import routes

// database connection

dotenv.config();
// connectDB();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes
app.use("/api/v1/auth", authUserRouter);
app.use("/api/v1/bookshelves", bookshelfRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/borrowedBooks", borrowedBookRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/donatedBooks", donatedBookRouter);
app.use("/api/v1/genres", genreRouter);
app.use("/api/v1/ratings", ratingRouter);

// Invalid endpoint
app.get("/*", (req, res) => {
  res.send("invalid endpoint!");
});

app.listen(8000, () => {
  console.log("Server is running on port http://localhost:8000/");
});

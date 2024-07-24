import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./database/index.js";

// Routes
import authUserRouter from "./routes/authUserRouter.js";
import userRouter from "./routes/userRouter.js";
import bookshelfRouter from "./routes/bookshelfRouter.js";
import bookRouter from "./routes/bookRouter.js";
import commentRouter from "./routes/commentRouter.js";
import genreRouter from "./routes/genreRouter.js";
import ratingRouter from "./routes/ratingRouter.js";
import borrowedBookRouter from "./routes/borrowedBookRouter.js";
import donatedBookRouter from "./routes/donatedBookRouter.js";
import globalErrorHandler from "./middlewares/globalError/index.js";

// Import routes

dotenv.config();
// connectDB();

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());



// Routes
app.use("/api/v1/auth", authUserRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/bookshelves", bookshelfRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/genres", genreRouter);
app.use("/api/v1/ratings", ratingRouter);
app.use("/api/v1/borrowedBooks", borrowedBookRouter);
app.use("/api/v1/donatedBooks", donatedBookRouter);

// Static assets
app.use(express.static("assets"));

// Global error handler
app.use(globalErrorHandler);

// Server Listener
const port = process.env.PORT || 4000;

// Invalid endpoint
app.get("/*", (req, res) => {
  res.send("invalid endpoint!");
});

app.listen(port, () => {
  console.log("Server is running on port http://localhost:8000/");
});

import express from "express";
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
} from "../controllers/booksControllers/book.js";

const bookRouter = express.Router();

bookRouter.post("/new", createBook);
bookRouter.get("/", getBooks);
bookRouter.get("/:id", getBook);
bookRouter.delete("/:id", deleteBook);

export default bookRouter;

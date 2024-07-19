import express from "express";
import {
  createBookshelf,
  deleteBookshelf,
  getBookshelf,
  getBookshelves,
} from "../controllers/bookshelfController/bookshelf.js";

const bookshelfRouter = express.Router();

bookshelfRouter.post("/new", createBookshelf);
bookshelfRouter.get("/", getBookshelves);
bookshelfRouter.get("/:id", getBookshelf);
bookshelfRouter.delete("/:id", deleteBookshelf);

export default bookshelfRouter;

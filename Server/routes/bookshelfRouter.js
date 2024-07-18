import express from "express";


const bookshelfRouter = express.Router();

bookshelfRouter.post("/new", newAddBookshelf);

export default bookshelfRouter;

import express from "express";
// import { createBook } from "../controllers/bookController.js";

const bookRouter = express.Router();

bookRouter.post("/new", newAddBook);

export default bookRouter;
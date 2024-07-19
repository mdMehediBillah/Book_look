import express from "express";


const genreRouter = express.Router();

genreRouter.post("/new", newAddGenre);

export default genreRouter;
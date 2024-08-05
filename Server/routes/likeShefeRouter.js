import express from "express";

import {
  getAllLikedShelves,
  likeShelfController,
} from "../controllers/likeShelfRouter/likeShelfController.js";

const likeShelfRouter = express.Router();

likeShelfRouter.get("/likedBookshelves/:userId", getAllLikedShelves);
likeShelfRouter.post("/", likeShelfController);

export default likeShelfRouter;

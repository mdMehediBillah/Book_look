import express from "express";


const ratingBookRouter = express.Router();


ratingBookRouter.post("/new", newAddRatingBook);


export default ratingBookRouter;
import express from "express";


const donatedBookRouter = express.Router();

donatedBookRouter.post("/new", newDonatedBook);

export default donatedBookRouter;
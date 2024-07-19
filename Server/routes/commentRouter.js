import express from "express";


const commentRouter = express.Router();


commentRouter.post("/new", newAddComment);


export default commentRouter;

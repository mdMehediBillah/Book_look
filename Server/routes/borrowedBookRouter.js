import express from "express";


const borrowedBookRouter = express.Router();

borrowedBookRouter.post("/new", newBorrowedBook);

export default borrowedBookRouter;

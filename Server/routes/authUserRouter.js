import express from "express";
import {
  createUser,
  loginUser,
  updateUser,
  userLogout,
  changePassword,
} from "../controllers/authController.js";


const authUserRouter = express.Router();

authUserRouter.post("/register", createUser);
authUserRouter.post("/login", loginUser);
authUserRouter.put("/update/:userId", updateUser);
authUserRouter.get("/logout", userLogout);
authUserRouter.put("/change-password/:id", changePassword);


export default authUserRouter;
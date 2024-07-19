import express from "express";



const authUserRouter = express.Router();

authUserRouter.post("/register", createUser);
authUserRouter.post("/login", loginUser);
authUserRouter.put("/update/:userId", updateUser);
authUserRouter.get("/logout", userLogout);
authUserRouter.put("/change-password/:id", changePassword);


export default authUserRouter;
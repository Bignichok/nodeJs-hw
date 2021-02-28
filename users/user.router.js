const { Router } = require("express");
const userController = require("./user.controller");
const userRouter = Router();

userRouter.post("/register", userController.registerUser);

userRouter.post("/login", userController.loginUser);

module.exports = userRouter;

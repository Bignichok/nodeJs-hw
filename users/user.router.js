const { Router } = require("express");
const userRouter = Router();

const userController = require("./user.controller");

const { validate } = require("../helpers/validate.js");
const {
    registerUserValidateSchema,
    loginUserValidateSchema,
} = require("../helpers/validateSchemas.js");

userRouter.post(
    "/auth/register",
    validate(registerUserValidateSchema),
    userController.registerUser
);

userRouter.post(
    "/auth/login",
    validate(loginUserValidateSchema),
    userController.loginUser
);

userRouter.post("/auth/logout", userController.authorizeUser, userController.logoutUser);

userRouter.get(
    "/users/current",
    userController.authorizeUser,
    userController.getCurrentUser
);

userRouter.get("/users", userController.getUsers);

module.exports = userRouter;

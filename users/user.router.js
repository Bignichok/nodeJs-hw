const { Router } = require("express");
const userRouter = Router();

const userController = require("./user.controller");

const { validate } = require("../helpers/validate.js");
const {
    registerUserValidateSchema,
    loginUserValidateSchema,
} = require("../helpers/validateSchemas.js");

userRouter.post(
    "/register",
    validate(registerUserValidateSchema),
    userController.registerUser
);

userRouter.post("/login", validate(loginUserValidateSchema), userController.loginUser);

module.exports = userRouter;

const { Router } = require("express");
const userRouter = Router();

const userController = require("./user.controller");

const { validate } = require("../helpers/validate.js");
const {
    registerUserValidateSchema,
    loginUserValidateSchema,
} = require("../helpers/validateSchemas.js");
const authorizeUser = require("../helpers/authorizeUser.js");
const upload = require("../helpers/uploadAvatars");

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

userRouter.post("/auth/logout", authorizeUser, userController.logoutUser);

userRouter.get("/auth/verify/:verificationToken", userController.verifyUser);

userRouter.get("/users/current", authorizeUser, userController.getCurrentUser);

userRouter.get("/users", userController.getUsers);

userRouter.patch(
    "/users/avatars",
    authorizeUser,
    upload.single("avatar"),
    userController.updateUser
);

module.exports = userRouter;

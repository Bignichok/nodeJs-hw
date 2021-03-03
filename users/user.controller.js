const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./user");

const saltRounds = 10;
class UsersController {
    constructor() {}
    get registerUser() {
        return this._registerUser.bind(this);
    }

    get loginUser() {
        return this._loginUser.bind(this);
    }

    get logoutUser() {
        return this._logoutUser.bind(this);
    }

    get authorizeUser() {
        return this._authorizeUser.bind(this);
    }

    async _registerUser(req, res, next) {
        try {
            const {
                body: { password },
            } = req;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const data = await User.create({
                ...req.body,
                password: hashedPassword,
            });
            res.json({
                email: data.email,
                subscription: data.subscription,
            }).status(201);
        } catch (err) {
            if (err.code === 11000) {
                return res.status(400).send("Email is duplicated");
            }
            next(err);
        }
    }

    async _loginUser(req, res, next) {
        try {
            const {
                body: { email, password },
            } = req;

            const user = await User.findUserByEmail(email);
            const passwordCompareResult = await bcrypt.compare(password, user.password);
            if (!passwordCompareResult) {
                return res.status(401).send("Authentication error");
            }
            const token = await jwt.sign({ userId: user._id }, process.env.PRIVATE_KEY);

            return res.status(200).send({
                token: token,
                user: {
                    email: user.email,
                    subscription: user.subscription,
                },
            });
        } catch (err) {
            next(err);
        }
    }

    async _logoutUser(req, res, next) {
        try {
            console.log("_logoutUser");
        } catch (err) {
            next(err);
        }
    }

    async _authorizeUser(req, res, next) {
        try {
            const authorizationHeader = req.get("Authorization");
            const token = authorizationHeader?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).send({
                    message: "Not authorized",
                });
            }

            const { userId } = await jwt.verify(token, process.env.PRIVATE_KEY);

            const user = await User.findById(userId);
            req.user = user;
            next();
        } catch (err) {
            next(err);
        }
    }
}

const userController = new UsersController();
module.exports = userController;

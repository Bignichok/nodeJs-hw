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

    async _registerUser(req, res, next) {
        try {
            const {
                body: { password },
            } = req;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            console.log("hashedPassword");
            const data = await User.create({
                ...req.body,
                password: hashedPassword,
            });
            res.json(data).status(401);
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
            console.log(user, "user");
            const passwordCompareResult = await bcrypt.compare(password, user.password);
            if (!passwordCompareResult) {
                return res.status(401).send("Authentication error");
            }
            const token = await jwt.sign(
                { userId: user._id },
                process.env.PRIVATE_KEY,
                { algorithm: "RS256" },
                function (err, token) {
                    console.log(token);
                }
            );
            return res.status(200).send("Authentication success");
        } catch (err) {
            next(err);
        }
    }

    async _logoutUser(req, res, next) {
        try {
        } catch (err) {
            next(err);
        }
    }
}

const userController = new UsersController();
module.exports = userController;

const bcrypt = require("bcrypt");

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
            bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
                // result == true
            });
        } catch (err) {
            next(err);
        }
    }
}

const userController = new UsersController();
module.exports = userController;

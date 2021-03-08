const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs").promises;

const User = require("./User");

const { IMG_DIR } = require("../constants");

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

    get getCurrentUser() {
        return this._getCurrentUser.bind(this);
    }

    get getUsers() {
        return this._getUsers.bind(this);
    }

    get updateUser() {
        return this._updateUser.bind(this);
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
                avatarURL: data.avatarURL,
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

            if (!user) {
                return res.status(401).send("Authentication is failed");
            }

            const passwordCompareResult = await bcrypt.compare(password, user.password);

            if (!passwordCompareResult) {
                return res.status(401).send("Authentication error");
            }

            const token = await jwt.sign({ userId: user._id }, process.env.PRIVATE_KEY);

            await User.findUserByIdAndUpdate(user._id, { token });

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
            const userId = req.user._id;
            await User.findUserByIdAndUpdate(userId, { token: null });

            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }

    async _getUsers(req, res, next) {
        try {
            const users = await User.find();

            res.status(200).send(users);
        } catch (err) {
            next(err);
        }
    }

    async _getCurrentUser(req, res, next) {
        try {
            if (!req.user) {
                return res.status(404).send({ message: "user is not found" });
            }
            res.status(200).send(req.user);
        } catch (err) {
            next(err);
        }
    }

    async _updateUser(req, res, next) {
        try {
            const userId = req.user._id;

            if (req.file) {
                const { file } = req;
                const img = await Jimp.read(file.path);
                const imgPath = path.join(IMG_DIR, file.originalname);
                const localUrl = `http://localhost:3000/images/${file.originalname}`;

                img.autocrop()
                    .cover(
                        250,
                        250,
                        Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE
                    )
                    .writeAsync(file.path);

                await fs.rename(file.path, imgPath);
                await User.findUserByIdAndUpdate(userId, {
                    avatarURL: localUrl,
                });

                return res.status(200).json({ avatarURL: localUrl });
            }
        } catch (err) {
            next(err);
        }
    }
}

const userController = new UsersController();
module.exports = userController;

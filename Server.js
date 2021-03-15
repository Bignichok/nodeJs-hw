const path = require("path");
const fs = require("fs");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const contactsRouter = require("./contacts/contact.router");
const userRouter = require("./users/user.router");

const createNewFolder = require("./helpers/createNewFolder");

const { UPLOAD_DIR, IMG_DIR } = require("./constants");

dotenv.config();

class Server {
    constructor() {
        this.app = null;
        this.PORT = process.env.PORT || 8080;
        this.MONGODB_URL = process.env.MONGODB_URL;
    }

    async start() {
        this._initServer();
        this._initMiddleWares();
        this._initRoutes();
        await this._initDB();
        this._startListening();
    }

    _initServer() {
        this.app = express();
    }

    _initMiddleWares() {
        this.app.use(express.json());

        this.app.use(
            morgan("dev", {
                skip: function (req, res) {
                    return res.statusCode < 400;
                },
            })
        );

        // log all requests to access.log
        this.app.use(
            morgan("common", {
                stream: fs.createWriteStream(path.join(__dirname, "access.log"), {
                    flags: "a",
                }),
            })
        );
        this.app.use(
            cors({
                origin: "http://localhost:3000",
            })
        );

        this.app.use("/images", express.static(IMG_DIR));
        this.app.use(express.static(path.join(__dirname, "public")));
    }

    _initRoutes() {
        this.app.use("/api/contacts", contactsRouter);
        this.app.use("/", userRouter);
    }

    async _initDB() {
        try {
            await mongoose.connect(this.MONGODB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("Database connection successful");
        } catch (err) {
            console.log(err);
            process.exit(1);
        }
    }

    _startListening() {
        this.app.listen(process.env.PORT, async (err) => {
            try {
                if (err) {
                    return console.log(err);
                }
                createNewFolder(UPLOAD_DIR);
                createNewFolder(IMG_DIR);

                console.log(`Started listening server on ${this.PORT}`);
            } catch (err) {
                console.log(err);
            }
        });
    }
}

module.exports = {
    contactsServer: new Server(),
};

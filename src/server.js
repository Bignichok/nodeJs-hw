const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const contactsRouter = require("./contacts/contacts.router");

dotenv.config({ path: path.join(__dirname, ".env.local") });

class CrudServer {
    constructor() {
        this.app = null;
    }

    start() {
        this._initServer();
        this._initMiddleWares();
        this._initRoutes();
        this._initErrorHandler();
        this._startListening();
    }

    _initServer() {
        this.app = express();
    }

    _initMiddleWares() {
        this.app.use(express.json()); // for parsing application/json
        this.app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
        // log only 4xx and 5xx responses to console
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
                origin: "http://localhosasdasdt:3000",
            })
        );
    }

    _initRoutes() {
        this.app.use("/api/contacts", contactsRouter);
    }

    _initErrorHandler() {
        this.app.use((err, req, res, next) => {
            const statusCode = err.status || 500;
            return res.status(statusCode).send(err.message);
        });
    }

    _startListening() {
        this.app.listen(process.env.PORT, (err) => {
            if (err) {
                return console.log(err);
            }

            console.log(`Started listening server on ${process.env.PORT}`);
        });
    }
}

module.exports = {
    contactsAPI: new CrudServer(),
};

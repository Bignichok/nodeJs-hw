const path = require("path");
const dotenv = require("dotenv");
const express = require("express");

const contactsRouter = require("./contacts/contacts.router");

dotenv.config({ path: path.join(__dirname, "../.env.local") });

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

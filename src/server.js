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
        this.initServer();
        this.initMiddleWares();
        this.initRoutes();
        this.initErrorHandler();
        this.startListening();
    }

    initServer() {
        this.app = express();
    }

    initMiddleWares() {
        this.app.use(express.json()); // for parsing application/json
        this.app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    }

    initRoutes() {
        this.app.use("/api/contacts", contactsRouter);
    }

    initErrorHandler() {
        this.app.use((err, req, res, next) => {
            const statusCode = err.status || 500;
            return res.status(statusCode).send(err.message);
        });
    }

    startListening() {
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

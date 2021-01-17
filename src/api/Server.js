const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

dotenv.config({ path: path.join(__dirname, "../.env.local") });

class Server {
    constructor() {
        this.app = null;
    }

    start() {
        this._initServer();
        this._initMiddleWares();
        this._initRoutes();
        this._initDB();
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
                origin: "http://localhosasdasdt:3000",
            })
        );
    }

    _initRoutes() {
        this.app.use("/contacts", contactsRouter);
    }

    _initDB() {}

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
    contactsServer: new Server(),
};

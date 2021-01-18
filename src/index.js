const mongodb = require("mongodb");
const dotenv = require("dotenv");
const path = require("path");
const { MongoClient, ObjectID } = mongodb;

const DB_NAME = "db_contacts";

dotenv.config({ path: path.join(__dirname, "./.env.local") });

const main = async () => {
    const client = await MongoClient.connect(process.env.MONGODB_URL);
    console.log("Database connection successful");

    const db = client.db(DB_NAME);
    const contacts = db.collection("contacts");

    const contact = await contacts.find().toArray();
    console.log(contact);
};

main();

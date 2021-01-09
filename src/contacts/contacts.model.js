const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "../db/contacts.json");

const loadJSONParsedData = async (pathToJSON) => {
    try {
        const data = await fsPromises.readFile(pathToJSON, "utf8");
        return JSON.parse(data);
    } catch (err) {
        throw new Error(err);
    }
};

const writeParsedData = (pathToJSON, data) => {
    fs.writeFile(pathToJSON, JSON.stringify(data), (err) => {
        if (err) throw err;
        console.log("success write to file!");
    });
};

const findContacts = async () => {
    try {
        const parsedContacts = await loadJSONParsedData(contactsPath);
        return parsedContacts;
    } catch (err) {
        throw new Error(err);
    }
};

const findContactById = async (contactId) => {
    try {
        const parsedContacts = await loadJSONParsedData(contactsPath);

        return parsedContacts.find((contact) => contactId === contact.id);
    } catch (err) {
        throw new Error(err);
    }
};

const saveContact = async (contactParams) => {
    try {
        const parsedContacts = await loadJSONParsedData(contactsPath);

        if (
            parsedContacts.some(
                ({ name: contactName }) => contactParams.name === contactName
            )
        ) {
            console.log(`\x1B[31m ${contactParams.name} already exist!`);
            return;
        }

        const nextId = parsedContacts[parsedContacts.length - 1].id + 1;
        const newContact = {
            id: nextId,
            ...contactParams,
        };

        const arrWithNewContact = [...parsedContacts, newContact];
        writeParsedData(contactsPath, arrWithNewContact);
        return newContact;
    } catch (err) {
        throw new Error(err);
    }
};

const removeContact = async (contactId) => {
    try {
        const parsedContacts = await loadJSONParsedData(contactsPath);

        if (!parsedContacts.some(({ id }) => id === contactId)) {
            console.log(`\x1B[31m we have not contact with this ${contactId} id`);
            return;
        }

        const restContacts = parsedContacts.filter((contact) => {
            return contactId !== contact.id;
        });

        writeParsedData(contactsPath, restContacts);
        console.log(`${contactId} id was deleted`);
        console.table(restContacts);
    } catch (err) {
        throw new Error(err);
    }
};

const updateContact = async (contactId, contactParams) => {
    try {
        const parsedContacts = await loadJSONParsedData(contactsPath);
        const contactIndex = parsedContacts.findIndex(
            (contact) => contact.id === contactId
        );

        parsedContacts[contactIndex] = {
            ...parsedContacts[contactIndex],
            ...contactParams,
        };

        return parsedContacts[contactIndex];
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = {
    findContacts,
    findContactById,
    saveContact,
    removeContact,
    updateContact,
};

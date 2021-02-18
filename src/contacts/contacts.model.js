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

const writeParsedData = async (pathToJSON, data) => {
    try {
        await fsPromises.writeFile(pathToJSON, JSON.stringify(data, null, 2), (err) => {
            if (err) throw err;
            console.log("success write to file!");
        });
    } catch (e) {
        throw new Error(e);
    }
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

        const restContacts = parsedContacts.filter((contact) => contactId !== contact.id);

        if (parsedContacts.length === restContacts) {
            console.log(`\x1B[31m we have not contact with this ${contactId} id`);
            return;
        }

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

        writeParsedData(contactsPath, parsedContacts);
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

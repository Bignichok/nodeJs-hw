//imports from model
const {
    findContacts,
    findContactById,
    saveContact,
    removeContact,
    updateContact,
} = require("./contacts.model");

const getContacts = async (req, res, next) => {
    try {
        const contacts = await findContacts();

        res.status(200).send(contacts);
    } catch (err) {
        throw new Error(err);
    }
};

const getContactById = async (req, res, next) => {
    try {
        const contactId = Number(req.params.contactId);
        const contact = await findContactById(contactId);

        if (!contact) {
            return res.status(404).send({ message: "Contact was not found" });
        }
        console.log(contact);
        res.status(200).send(contact);
    } catch (err) {
        throw new Error(err);
    }
};

const addContact = async (req, res, next) => {
    try {
        const newContact = await saveContact(req.body);
        res.status(201).send(newContact);
    } catch (err) {
        throw new Error(err);
    }
};

const removeContactById = async (req, res, next) => {
    try {
        const contactId = Number(req.params.contactId);
        const contact = await findContactById(contactId);

        if (!contact) {
            return res.status(404).send({ message: "Contact was not found" });
        }
        removeContact(contactId);
        res.status(200).send({ message: "contact deleted" });
    } catch (err) {}
};

const updateContactById = async (req, res, next) => {
    try {
        const contactId = Number(req.params.contactId);
        const contact = await findContactById(contactId);

        if (!contact) {
            return res.status(404).send({ message: "Contact was not found" });
        }

        const updatedContact = await updateContact(contactId, req.body);
        return res.status(200).send(updatedContact);
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = {
    getContacts,
    getContactById,
    addContact,
    removeContactById,
    updateContactById,
};

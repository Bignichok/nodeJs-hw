//imports from model
const {
    findContacts,
    findContactById,
    saveContact,
    removeContact,
    updateContact,
} = require("./contacts.model");

const getContacts = (req, res, next) => {
    const contacts = findContacts();

    res.status(200).send(contacts);
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

const addContact = (req, res, next) => {
    const newContact = saveContact(req.body);
    res.status(201).send(newContact);
};

const removeContactById = (req, res, next) => {
    const { contactId } = req.params;
    const contact = findContactById(contactId);

    if (!contact) {
        return res.status(404).send({ message: "Contact was not found" });
    }
    removeContact(contactId);
    res.status(200).send({ message: "contact deleted" });
};

const updateContactById = (req, res, next) => {
    const { contactId } = req.params;
    const contact = findContactById(contactId);

    //need to test

    // if (!req.body) {
    //     return res.status(400).send({ message: "missing fields" });
    // }

    if (!contact) {
        return res.status(404).send({ message: "Contact was not found" });
    }

    updateContact(contactId, req.body);
    return res.status(200).send(updateContact);
};

module.exports = {
    getContacts,
    getContactById,
    addContact,
    removeContactById,
    updateContactById,
};

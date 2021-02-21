const Contact = require("./Contact");
const {
    Types: { ObjectId },
} = require("mongoose");

class ContactsController {
    constructor() {}
    get addContact() {
        return this._addContact.bind(this);
    }

    get getContacts() {
        return this._getContacts.bind(this);
    }

    get getContactById() {
        return this._getContactById.bind(this);
    }

    get updateContactById() {
        return this._updateContactById.bind(this);
    }

    get deleteContactById() {
        return this._deleteContactById.bind(this);
    }

    async _addContact(req, res, next) {
        try {
            const data = req.body;
            const existingContact = await Contact.findContactByEmail(data.email);

            if (existingContact) {
                return res.status(409).send("Contact with this email already exist");
            }

            await Contact.create(data);

            return res.status(201).json(data);
        } catch (err) {
            next(err);
        }
    }

    async _getContacts(req, res, next) {
        try {
            const contacts = await Contact.find();

            return res.status(200).json(contacts);
        } catch (err) {
            next(err);
        }
    }

    async _getContactById(req, res, next) {
        try {
            const { id } = req.params;
            const contact = await Contact.findById(id);

            if (!contact) {
                return res.status(404).send("contact was not found");
            }

            return res.status(200).json(contact);
        } catch (err) {
            next(err);
        }
    }

    async _updateContactById(req, res, next) {
        try {
            const { id } = req.params;

            const updatedContact = await Contact.findContactByIdAndUpdate(id, req.body);
            if (!updatedContact) {
                return res.status(404).send("contact was not found");
            }

            return res.status(200).json(updatedContact);
        } catch (err) {
            next(err);
        }
    }

    async _deleteContactById(req, res, next) {
        try {
            const { id } = req.params;
            const { deletedCount } = await Contact.deleteOne({ _id: id });

            if (!deletedCount) {
                return res.status(404).send("contact was not found");
            }

            return res.status(200).send("contact successfully deleted");
        } catch (err) {
            next(err);
        }
    }

    validateId(req, res, next) {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).send("Id is not valid");
        }

        next();
    }
}

const contactController = new ContactsController();
module.exports = contactController;

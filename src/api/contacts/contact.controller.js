const Joi = require("joi");
const contactModel = require("./contact.model");
Joi.objectId = require("joi-objectid")(Joi);

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
            const { name, email, phone } = req.body;

            const existingContact = await contactModel.findContactByEmail(email);
            if (existingContact) {
                return res.status(409).send("Contact with this email already exist");
            }

            const newContact = {
                name,
                email,
                password: "password",
            };

            return res.status(201).json({
                id: newContact._id,
                name: newContact.name,
                email: newContact.email,
            });
        } catch (err) {
            next(err);
        }
    }

    async _getContacts(req, res, next) {
        try {
            const contacts = await contactModel.find();
            console.log(contacts);
            console.log(this.contactsNormalizer(contacts));

            return res.status(200).json(this.contactsNormalizer(contacts));
        } catch (err) {
            next(err);
        }
    }

    async _getContactById(req, res, next) {
        try {
        } catch (err) {
            next(err);
        }
    }

    async _updateContactById(req, res, next) {
        try {
        } catch (err) {
            next(err);
        }
    }

    async _deleteContactById(req, res, next) {
        try {
        } catch (err) {
            next(err);
        }
    }

    validateId(req, res, next) {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).send();
        }

        next();
    }

    validateAddContact(req, res, next) {
        const validationRules = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            phone: Joi.string().required(),
        });

        const validationResult = Joi.validate(req.body, validationRules);
        if (validationResult.error) {
            return res.status(400).send(validationResult.error);
        }
        next();
    }

    validateUpdateContact(req, res, next) {
        const validationRules = Joi.object({
            name: Joi.string(),
            email: Joi.string().email(),
            phone: Joi.string(),
        });

        const validationResult = Joi.validate(req.body, validationRules);
        if (validationResult.error) {
            return res.status(400).send(validationResult.error);
        }
        next();
    }

    contactsNormalizer(contacts) {
        return contacts.map((contact) => {
            const { name, email, phone, _id } = contact;

            return { id: _id, name, email, phone };
        });
    }
}

module.exports = new ContactsController();

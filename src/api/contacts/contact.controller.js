const { required } = require("joi");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const contactModel = require("./contact.model");
Joi.objectId = require("joi-objectid");

class ContactsController {
    get addContact() {
        this._addContact.bind(this);
    }

    get getContacts() {
        this._getContacts.bind(this);
    }

    get getContactById() {
        this._getContactById.bind(this);
    }

    get updateContactById() {
        this._updateContactById.bind(this);
    }

    get deleteContactById() {
        this._deleteContactById.bind(this);
    }

    async _addContact(req, res, next) {
        try {
        } catch (err) {
            next(err);
        }
    }

    async _getContacts(req, res, next) {
        try {
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
}

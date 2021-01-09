const { Router } = require("express");
const Joi = require("joi");
const { validate } = require("../helpers/validate");
const {
    getContacts,
    getContactById,
    addContact,
    removeContactById,
    updateContactById,
} = require("./contacts.controller");

const router = Router();

const newContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
});

const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
});

router.get("/", getContacts);

router.get("/:contactId", getContactById);

router.post("/", validate(newContactSchema), addContact);

router.delete("/:contactId", removeContactById);

router.patch("/:contactId", validate(updateContactSchema), updateContactById);

module.exports = router;

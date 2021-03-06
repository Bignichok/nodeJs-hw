const { Router } = require("express");

const contactController = require("./contact.controller");
const contactRouter = Router();

const { validate } = require("../helpers/validate.js");
const {
    addContactValidateSchema,
    updateContactValidateSchema,
} = require("../helpers/validateSchemas.js");
const authorizeUser = require("../helpers/authorizeUser.js");

contactRouter.post(
    "/",
    authorizeUser,
    validate(addContactValidateSchema),
    contactController.addContact
);

contactRouter.put(
    "/:id",
    authorizeUser,
    validate(updateContactValidateSchema),
    contactController.validateId,
    contactController.updateContactById
);

contactRouter.get("/", authorizeUser, contactController.getContacts);

contactRouter.get(
    "/:id",
    authorizeUser,
    contactController.validateId,
    contactController.getContactById
);

contactRouter.delete(
    "/:id",
    authorizeUser,
    contactController.validateId,
    contactController.deleteContactById
);

module.exports = contactRouter;

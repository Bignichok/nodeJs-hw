const { Router } = require("express");
const contactController = require("./contact.controller");
const contactRouter = Router();

const { validate } = require("../helpers/validate.js");
const {
    addContactValidateSchema,
    updateContactValidateSchema,
} = require("../helpers/validateSchemas.js");

contactRouter.post("/", validate(addContactValidateSchema), contactController.addContact);

contactRouter.put(
    "/:id",
    validate(updateContactValidateSchema),
    contactController.validateId,
    contactController.updateContactById
);

contactRouter.get("/", contactController.getContacts);

contactRouter.get("/:id", contactController.validateId, contactController.getContactById);

contactRouter.delete(
    "/:id",
    contactController.validateId,
    contactController.deleteContactById
);

module.exports = contactRouter;

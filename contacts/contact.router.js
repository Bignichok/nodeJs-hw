const { Router } = require("express");
const contactController = require("./contact.controller");
const { validate, validateId } = require("../helpers/validate");
const {
    addContactValidateSchema,
    updateContactValidateSchema,
} = require("../helpers/validateSchemas");

const contactRouter = Router();

contactRouter.post("/", validate(addContactValidateSchema), contactController.addContact);

contactRouter.put(
    "/:id",
    validate(updateContactValidateSchema),
    validateId,
    contactController.updateContactById
);

contactRouter.get("/", contactController.getContacts);

contactRouter.get("/:id", validateId, contactController.getContactById);

contactRouter.delete("/:id", validateId, contactController.deleteContactById);

module.exports = contactRouter;

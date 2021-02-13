const { Router } = require("express");
const contactController = require("./contact.controller");
console.log(contactController);
const contactRouter = Router();

contactRouter.post(
    "/",
    contactController.validateAddContact,
    contactController.addContact
);

contactRouter.put(
    "/:id",
    contactController.validateUpdateContact,
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

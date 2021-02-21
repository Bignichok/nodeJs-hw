const { Router } = require("express");
const contactController = require("./contact.controller");
const contactRouter = Router();

contactRouter.post("/", contactController.addContact);

contactRouter.put(
    "/:id",
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

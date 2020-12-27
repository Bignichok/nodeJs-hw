const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const contactsPath = path.join("./db/contacts.json");

const loadJSONParsedData = async (pathToJSON) => {
  try {
    const data = await fsPromises.readFile(pathToJSON, "utf8");
    return JSON.parse(data);
  } catch (err) {
    throw new Error(err);
  }
};

const writeParsedData = (pathToJSON, data) => {
  fs.writeFile(pathToJSON, JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log("success write to file!");
  });
};

const listContacts = async () => {
  try {
    const parsedData = await loadJSONParsedData(contactsPath);
    console.table(parsedData);
  } catch (err) {
    throw new Error(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const parsedData = await loadJSONParsedData(contactsPath);

    if (!parsedData.some(({ id }) => id === contactId)) {
      console.log(`\x1B[31m we have not contact with this ${contactId} id`);
      return;
    }

    const contact = parsedData.filter((contact) => contactId === contact.id);

    console.log(contact);
  } catch (err) {
    throw new Error(err);
  }
};

const removeContact = async (contactId) => {
  try {
    const parsedData = await loadJSONParsedData(contactsPath);

    if (!parsedData.some(({ id }) => id === contactId)) {
      console.log(`\x1B[31m we have not contact with this ${contactId} id`);
      return;
    }

    const restContacts = parsedData.filter((contact) => contactId !== contact.id);

    writeParsedData(contactsPath, restContacts);
    console.log(`${contactId} id was deleted`);
    console.table(restContacts);
  } catch (err) {
    throw new Error(err);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const parsedData = await loadJSONParsedData(contactsPath);

    if (parsedData.some(({ name: contactName }) => name === contactName)) {
      console.log(`\x1B[31m ${name} already exist!`);
      return;
    }

    const nextId = parsedData[parsedData.length - 1].id + 1;
    const newContact = {
      id: nextId,
      name: name,
      email: email,
      phone: phone,
    };

    const arrWithNewContact = [...parsedData, newContact];
    writeParsedData(contactsPath, arrWithNewContact);
    console.log(`${name} added`);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

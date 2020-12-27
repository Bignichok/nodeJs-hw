const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const contactsPath = path.join("./db/contacts.json");

const loadJSONParsedData = async (pathToJSON) => {
  const data = await fsPromises.readFile(pathToJSON, "utf8");
  return JSON.parse(data);
};

const listContacts = async () => {
  try {
    const parsedData = await loadJSONParsedData(contactsPath);
    console.table(parsedData);
  } catch {
    throw new Error("Something went wrong in function listContacts");
  }
};

const getContactById = async (contactId) => {
  try {
    const parsedData = await loadJSONParsedData(contactsPath);
    const contact = parsedData.filter((contact) => contactId === contact.id);

    console.log(contact);
  } catch {
    throw new Error("Something went wrong in function getContactById");
  }
};

const removeContact = async (contactId) => {
  try {
    const parsedData = await loadJSONParsedData(contactsPath);
    const restContacts = parsedData.filter((contact) => contactId !== contact.id);

    fs.writeFile(contactsPath, JSON.stringify(restContacts), (err) => {
      if (err) throw err;
      console.log("The contact has been removed!");
    });

    console.table(restContacts);
  } catch {
    throw new Error("Something went wrong in function removeContact");
  }
};

const addContact = async (name, email, phone) => {
  const newContact = {
    id: 11,
    name: name,
    email: email,
    phone: phone,
  };
  const parsedData = await loadJSONParsedData(contactsPath);
  const arrWithNewContact = [...parsedData, newContact];

  fs.writeFile(contactsPath, JSON.stringify(arrWithNewContact), (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

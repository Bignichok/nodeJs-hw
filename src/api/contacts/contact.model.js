const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    subscription: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String, required: false },
});

const findContactByIdAndUpdate = async (contactId, updateParams) =>
    this.findByIdAndUpdate(contactId, { $set: updateParams }, { new: true });

const findContactByEmail = async (email) => this.findOne({ email });

const findContactByName = async (name) => this.findOne({ name });

const findContactByPhone = async (phone) => this.findOne({ phone });

const updateToken = async (id, newToken) =>
    this.findByIdAndUpdate(id, { token: newToken });

contactSchema.statics.findContactByIdAndUpdate = findContactByIdAndUpdate;
contactSchema.statics.findContactByEmail = findContactByEmail;
contactSchema.statics.findContactByName = findContactByName;
contactSchema.statics.findContactByPhone = findContactByPhone;
contactSchema.statics.updateToken = updateToken;

const contactModel = mongoose.model("Contact", contactSchema);

module.exports = contactModel;

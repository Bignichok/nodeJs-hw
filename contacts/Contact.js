const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    subscription: { type: String, required: false },
    password: { type: String, required: false },
    token: { type: String, required: false },
    owner: {
        type: SchemaTypes.ObjectId,
        ref: "user",
    },
});

const findContactByIdAndUpdate = async function (contactId, updateParams) {
    return this.findByIdAndUpdate(contactId, { $set: updateParams }, { new: true });
};

const findContactByEmail = async function (email) {
    return this.findOne({ email });
};

const findContactByName = async function (name) {
    return this.findOne({ name });
};

const findContactByPhone = async function (phone) {
    return this.findOne({ phone });
};

contactSchema.statics.findContactByIdAndUpdate = findContactByIdAndUpdate;
contactSchema.statics.findContactByEmail = findContactByEmail;
contactSchema.statics.findContactByName = findContactByName;
contactSchema.statics.findContactByPhone = findContactByPhone;

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;

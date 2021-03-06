const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const {
    Schema,
    Types: { ObjectId },
} = mongoose;

const contactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    owner: {
        type: ObjectId,
        ref: "user",
    },
});

const findContactByIdAndUpdate = async function (contactId, updateParams, userId) {
    return this.findOneAndUpdate(
        { _id: contactId, owner: userId },
        { $set: updateParams },
        { new: true }
    );
};

const findContactByEmail = async function (email, userId) {
    return this.findOne({ email, owner: userId });
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

contactSchema.plugin(mongoosePaginate);

const Contact = mongoose.model("contact", contactSchema);

Contact.paginate({});

module.exports = Contact;

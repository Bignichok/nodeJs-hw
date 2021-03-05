const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Please enter Email Address"],
    },
    password: {
        type: String,
        required: true,
    },
    subscription: {
        type: String,
        enum: ["free", "pro", "premium"],
        default: "free",
    },
    token: { type: String, default: null },
});

const findUserByEmail = async function (email) {
    return this.findOne({ email });
};

const findUserByIdAndUpdate = async function (userId, updateParams) {
    return this.findByIdAndUpdate(userId, { $set: updateParams }, { new: true });
};

userSchema.statics.findUserByEmail = findUserByEmail;
userSchema.statics.findUserByIdAndUpdate = findUserByIdAndUpdate;

const User = mongoose.model("user", userSchema);
module.exports = User;

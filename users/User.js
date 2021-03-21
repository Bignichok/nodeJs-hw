const mongoose = require("mongoose");
const gravatar = require("gravatar");

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
    avatarURL: {
        type: String,
        default: function () {
            return gravatar.url(this.email, { s: "250", r: "x", d: "retro" }, true);
        },
    },
    subscription: {
        type: String,
        enum: ["free", "pro", "premium"],
        default: "free",
    },
    token: { type: String, default: null },
    verificationToken: {
        type: String,
        required: [true, "Verify token is required"],
    },
});

const findUserByEmail = async function (email) {
    return this.findOne({ email });
};

const findUserByIdAndUpdate = async function (userId, updateParams) {
    return this.findByIdAndUpdate(userId, { $set: updateParams }, { new: true });
};

const findUserByVerificationToken = async function (verificationToken) {
    return this.findOne({ verificationToken });
};

userSchema.statics.findUserByEmail = findUserByEmail;
userSchema.statics.findUserByIdAndUpdate = findUserByIdAndUpdate;
userSchema.statics.findUserByVerificationToken = findUserByVerificationToken;

const User = mongoose.model("user", userSchema);
module.exports = User;

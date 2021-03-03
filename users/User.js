const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Please enter Email Address"],
    },
    password: String,
    subscription: {
        type: String,
        enum: ["free", "pro", "premium"],
        default: "free",
    },
    token: String,
});

const findUserByEmail = async function (email) {
    return this.findOne({ email });
};

userSchema.statics.findUserByEmail = findUserByEmail;

const User = mongoose.model("User", userSchema);
module.exports = User;

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    id: String,
    password: String,
    country: String,
    village: String,
    profile: String,
    bio: String,
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: [],
    }],
    friendsRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: [],
    }],
},{timestamps: true})

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
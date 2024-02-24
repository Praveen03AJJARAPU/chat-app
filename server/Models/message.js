const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    senderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    receiverID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
}, {timestamps: true});

const messageModel = mongoose.model("message", messageSchema);

module.exports = messageModel;
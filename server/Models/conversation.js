const mongoose = require("mongoose");

const conversationsSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'message',
        default: [],
    }]
},{timestamps: true})

const conversation = new mongoose.model('conversation', conversationsSchema);

module.exports = conversation;
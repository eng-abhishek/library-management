const mongoose = require("mongoose");

const ReturnSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    duedate: Date,
    fine: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Return", ReturnSchema);
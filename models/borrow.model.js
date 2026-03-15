const mongoose = require("mongoose");

const BorrowSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    duedate: {
        type: Date,
        default: () => new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
    }
}, { timestamps: true });

module.exports = mongoose.model("Borrow", BorrowSchema);
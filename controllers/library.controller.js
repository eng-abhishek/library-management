const Book = require("../models/book.model");
const Borrow = require("../models/borrow.model");
const Return = require("../models/return.model");

exports.createBook = async (req, res) => {
    const book = await Book.create(req.body);
    res.status(201).json(book);
};

exports.getBooks = async (req, res) => {
    const books = await Book.find();
    res.json(books);
};

exports.borrowBook = async (req, res) => {

    // console.log("METHOD:", req.method);
    // console.log("HEADERS:", req.headers);
    // console.log("BODY:", req.body);

    //    return res.json({
    //       receivedBody: req.body,
    //       bodyType: typeof req.body
    //    });

    const { bookId } = req.body;
    console.log("BODY:", req.body);
    const book = await Book.findById(bookId);
    if (!book || !book.available)
        return res.status(400).json({ message: "Book Not Available" });

    await Borrow.create({ user: req.user._id, book: bookId });

    book.available = false;
    await book.save();

    res.json({ message: "Book Borrowed" });
};

exports.returnBook = async (req, res) => {
    const { bookId } = req.body;

    return res.json({
        receivedBody: bookId,
        user_id: req.user._id,
        user_info:req.user,
     });


    const borrow = await Borrow.findOne({ user: req.user._id, book: bookId });
    if (!borrow)
        return res.status(400).json({ message: "No Borrow Record" });

    const today = new Date();
    let fine = 0;

    if (today > borrow.duedate) {
        const diffDays = Math.ceil((today - borrow.duedate) / (1000 * 60 * 60 * 24));
        fine = diffDays * 2;
    }

    await Return.create({
        user: req.user._id,
        book: bookId,
        duedate: borrow.duedate,
        fine
    });

    await Book.findByIdAndUpdate(bookId, { available: true });

    res.json({ message: "Book Returned", fine });
};
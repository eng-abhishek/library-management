const router = require("express").Router();
const controller = require("../controllers/library.controller");
const { authenticate, isAdmin } = require("../middleware/auth.middleware");
const multer = require("multer");
const upload = multer();

router.get("/books", controller.getBooks);
router.post("/books", authenticate, isAdmin, upload.none(), controller.createBook);
router.post("/borrow", authenticate, upload.none(), controller.borrowBook);
router.post("/return", authenticate, upload.none(), controller.returnBook);

module.exports = router;
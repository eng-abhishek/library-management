const router = require("express").Router();
const { middleware1, middleware2 } = require("../middleware/logger.middleware");
const studentController = require("../controllers/student.controller");

router.get("/get-student", middleware1(), middleware2(), studentController.getStudent);

module.exports = router;

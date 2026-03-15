require("dotenv").config();
require("./db");

const express = require("express");
const passport = require("./config/passport");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();


// ✅ Body parser must come BEFORE routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use(passport.initialize());


app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/library", require("./routes/library.routes"));

app.use("/api/student", require("./routes/student.routes"));

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
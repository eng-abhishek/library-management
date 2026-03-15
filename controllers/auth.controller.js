const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => 
    {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch {
        res.status(500).json({ message: "Registration Failed" });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ token });
};
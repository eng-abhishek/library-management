const passport = require("passport");

exports.authenticate = passport.authenticate("jwt", { session: false });

exports.isAdmin = (req, res, next) => {
    if (!req.user.admin) {
        return res.status(403).json({ message: "Admin Only Access" });
    }
    next();
};
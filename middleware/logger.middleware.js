exports.middleware1 = () => (req, res, next) => {
    console.log("Middleware 1 called");
    next();
}

exports.middleware2 = () => (req, res, next) => {
    console.log("Middleware 2 called");
    next();
}
import errors from "../errors/index.js"

const {Unauthorized} =errors;

const AuthMiddleware = ( req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    throw new Unauthorized("Access Denied")
};

export default AuthMiddleware;

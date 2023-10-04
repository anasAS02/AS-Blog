const jwt = require('jsonwebtoken');
const httpStatusText = require('../utils/httpStatusText');
const appError = require('../utils/appError');

const verifyToken = (req, res, next) => {
    const authHeader = req.header['Authorization'] || req.header['authorization'];
    if(!authHeader){
        const err = appError.create('Token is required', 401, httpStatusText.ERROR);
        next(err);
    }
    try{
        const token = authHeader.split(' ')[1];
        const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.currentUser = token;
        next();
    }catch(err){
        const error = appError.create('Invalin token', 401, httpStatusText.ERROR);
        return next(error);
    }
}

module.exports = verifyToken;
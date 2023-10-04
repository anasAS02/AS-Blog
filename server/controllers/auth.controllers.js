const User = require('../models/user.model');
const asyncWrapper = require('../middlewares/asyncWrapper');
const appError = require('../utils/appError');
const httpStatusText = require('../utils/httpStatusText');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = asyncWrapper(
    async(req, res, next) => {
        const{userName, password} = req.body;

        if(!userName || !password){
            const error = appError.create('the username and password are required', 400, httpStatusText.ERROR);
            return next(error);
        }
        
        const user = await User.findOne({userName});
        
        if(user){
            const error = appError.create('this username is already exists', 400, httpStatusText.ERROR);
            return next(error);
        }
        const hashPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            userName,
            password: hashPassword
        })
        if(!user){
            const token = await jwt.sign({userName: newUser.userName, id: User.id}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
            newUser.token = token;
            await newUser.save()
            res.status(201).json({status: httpStatusText.SUCCESS, data: {token, userName}})
        }
    }
)

const login = asyncWrapper(
    async(req, res, next) => {
        const{userName, password} = req.body;

        if(!userName || !password){
            const error = appError.create('the username and password are required', 400, httpStatusText.ERROR);
            return next(error);
        }
        
        const user = await User.findOne({userName});
        
        if(!user){
            const error = appError.create('this username is wrong', 400, httpStatusText.ERROR);
            return next(error);
        }

        const matchedPassword = await bcrypt.compare(password, user.password);

        
        if(!matchedPassword){
            const err = appError.create('this password is wrong.', 400, httpStatusText.ERROR)
            return next(err)
        }

        if(user && matchedPassword){
            const token = await jwt.sign({userName: User.userName, id: User.id}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
            User.token = token;
            res.status(200).json({status: httpStatusText.SUCCESS, data: {token, userName}})
        }
    }
)

const logout = (req, res) => {
    delete User.token;
    return res.status(200).json({status: httpStatusText.SUCCESS, data: null});
}

module.exports = {
    register,
    login,
    logout
}
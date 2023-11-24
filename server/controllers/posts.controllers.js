const post = require('../models/post.model');
const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require('../middlewares/asyncWrapper');
const appError = require('../utils/appError');
const {validationResult} = require('express-validator');

const getAllPosts = asyncWrapper(
    async(req, res) => {
        const posts = await post.find({}, {"__v": false}).sort({ createdAt: -1 });
        res.status(200).json({status: httpStatusText.SUCCESS, data: {posts}})
    }
)

const getUserPosts = asyncWrapper(
    async(req, res) => {
        const userName = req.params.userName;
        const posts = await post.find({userName: userName}, {"__v": false}).sort({ createdAt: -1 });

        res.status(200).json({status: httpStatusText.SUCCESS, data: {posts}})
    }
)

const getSinglePost = asyncWrapper(
    async(req, res, next) => {
        const foundPost = await post.findById(req.params.postId);
        if(!foundPost){
            const errors = appError.create(error.array(), 404, httpStatusText.ERROR);
            return next(errors)
        }
        res.status(200).json({status: httpStatusText.SUCCESS, data: {foundPost}})
    }
)

const createPost = asyncWrapper(
    async(req, res, next) => {
        const{title, thumbnail, summary, content, userName} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const errors = appError.create(error.array(), 400, httpStatusText.FAIL);
            return next(errors)
        }
        const newPost = new post({
            title,
            thumbnail: req.file.filename,
            summary,
            content,
            userName
        });
        await newPost.save();
        res.status(201).json({status: httpStatusText.SUCCESS, data: {newPost}});
    }
)

const updatePost = asyncWrapper(
    async(req, res) => {
        const foundedPost = req.params.postId;
        if(req.file){
            await post.updateOne({_id: foundedPost}, {$set: {... req.body, thumbnail: req.file.filename}})
        }
        await post.updateOne({_id: foundedPost}, {$set: {... req.body}})
        res.status(200).json({status: httpStatusText.SUCCESS, data: null})
    }
)

const deletePost = asyncWrapper(
    async(req, res) => {
        await post.deleteOne({_id: req.params.postId});
        res.status(200).json({status: httpStatusText.SUCCESS, data: null})
    }
)

const searchPost = asyncWrapper(
    async(req, res) => {
        const query = req.query;
        const keyword = query.keyword;
        const regex = new RegExp(keyword, 'i');

        const result = await post.find({
            $or: [
              { title: { $regex: regex } },
              { summary: { $regex: regex } }
            ]
        });

        res.status(200).json({status: httpStatusText.SUCCESS, data: {result}})
    }
)

module.exports = {
    getAllPosts,
    getUserPosts,
    createPost,
    getSinglePost,
    updatePost,
    deletePost,
    searchPost
}
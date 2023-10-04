const comment = require('../models/comment.model');
const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require('../middlewares/asyncWrapper');
const appError = require('../utils/appError');

const createComment = asyncWrapper(
    async(req, res, next) => {
        const{ text, userName, postId } = req.body;
                
        if(!text){
            const err = appError.create('comment should not be empty', 400, httpStatusText.FAIL);
            next(err);
        }

        const newComment = new comment({
            text,
            userName,
            postId
        });
        
        await newComment.save();
        res.status(201).json({status: httpStatusText.SUCCESS, data: {newComment}});
    }
)


const showComments = asyncWrapper(
    async(req, res) => {
        const postId = req.params.postId;
        const comments = await comment.find({postId: postId}).sort({ createdAt: -1 });
        if (comments.length === 0) {
            res.status(200).json({status: httpStatusText.FAIL, data: null})
        }else{
            res.status(200).json({status: httpStatusText.SUCCESS, data: {comments}})
        }
    }
)

const updateComment = asyncWrapper(
    async(req, res) => {
        const foundedComment = req.params.commentId;

        const updateComment = await comment.updateOne({_id: foundedComment}, {$set: {... req.body}})
        res.status(200).json({status: httpStatusText.SUCCESS, data: {updateComment}})
    }
)

const deleteComment = asyncWrapper(
    async(req, res) => {
        await comment.deleteOne({_id: req.params.commentId});
        res.status(200).json({status: httpStatusText.SUCCESS, data: null})
    }
)

module.exports = {
    createComment,
    showComments,
    updateComment,
    deleteComment
}
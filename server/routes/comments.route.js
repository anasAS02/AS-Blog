const express = require('express');
const router = express.Router();
const commentsControllers = require('../controllers/comments.controllers');


router.route('/create')
                .post(commentsControllers.createComment);

router.route('/show/:postId')
                .get(commentsControllers.showComments);

router.route('/update/:commentId')
                .put(commentsControllers.updateComment);

router.route('/delete/:commentId')
                .delete(commentsControllers.deleteComment);


module.exports = router;
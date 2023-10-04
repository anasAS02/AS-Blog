const express = require('express');
const router = express.Router();
const postsControllers = require('../controllers/posts.controllers');
const appError = require('../utils/appError');
const multer = require('multer');

const diskStorage = multer.diskStorage({
        destination: function (req, file, cb) {
                cb(null, 'uploads')
        },
        filename: function (req, file, cb) {
                const ext = file.mimetype.split('/')[1];
                const fileName = `user-${Date.now()}.${ext}`;
                cb(null, fileName)
        }
})

const fileFilter = (req, file, cb) => {
        const imageType = file.mimetype.split('/')[0];
        if(imageType === 'image'){
                return cb(null, true);
        }else{
                return cb(appError.create('file must be an image', 400), false)
        }
}

const upload = multer({storage: diskStorage, fileFilter});

router.route('/')
        .get(postsControllers.getAllPosts)

router.route('/search')
        .get(postsControllers.searchPost)

router.route('/myPosts/:userName')
        .get(postsControllers.getUserPosts)

router.route('/create')
        .post(upload.single('thumbnail'), postsControllers.createPost)

router.route('/:postId')
        .get(postsControllers.getSinglePost)
        .put(upload.single('thumbnail'), postsControllers.updatePost)
        .delete(postsControllers.deletePost)


module.exports = router;
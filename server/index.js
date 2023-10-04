const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const httpStatusText = require('./utils/httpStatusText')
const mongoose = require('mongoose');
const url = process.env.MONGO_URL;

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

mongoose.connect(url).then(() => {
    console.log('mongodb server is connected');
})

const postsRouter = require('./routes/posts.route')
const commentsRoute = require('./routes/comments.route')
const authRouter = require('./routes/auth.route')

app.use('/api/posts', postsRouter)
app.use('/api/comments', commentsRoute)
app.use('/api/auth', authRouter)

app.all('*', (req, res, next) => {
    res.status(404).json({status: httpStatusText.ERROR, message: 'this resource is not available'});
})

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({status: error.statusText || httpStatusText.ERROR, message: error.message, code: error.statusCode || 500, data: null});
})

app.listen(process.env.PORT || 4000, () => {
    console.log('running now on 4000');
})
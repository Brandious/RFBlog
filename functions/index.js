const functions = require('firebase-functions');
const app = require('express')();


const {
    getAllPosts,
    createPost,
    deletePost,
    editPost
} = require('./api/posts');


app.get('/posts', getAllPosts);
app.post('/post', createPost);
app.delete('/post/:postId', deletePost);
app.put('/post/:postId', editPost);

exports.api = functions.https.onRequest(app);
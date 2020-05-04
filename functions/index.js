const functions = require('firebase-functions');
const app = require('express')();

const auth = require('./util/auth');

const {
    getAllPosts,
    getOnePost,
    createPost,
    deletePost,
    editPost,
    getAllPostsByUserId
} = require('./api/posts');


const {
    loginUser,
    signupUser,
    uploadProfilePhoto,
    getUserDetail,
    updateUserDetails
} = require('./api/users');

app.get('/posts', getAllPosts);
//app.get('/post/:postId', getOnePost);
app.get('/post', auth, getAllPostsByUserId);
app.post('/post', auth,createPost);
app.delete('/post/:postId', auth,deletePost);
app.put('/post/:postId', auth,editPost);

app.post('/login', loginUser);
app.post('/signup',signupUser);
app.post('/user/image', auth, uploadProfilePhoto);
app.get('/user', auth, getUserDetail);
app.post('/user', auth, updateUserDetails);

exports.api = functions.https.onRequest(app);
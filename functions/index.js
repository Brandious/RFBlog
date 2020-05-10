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
    updateUserDetails,
    followUser,
    getFollowers
} = require('./api/users');

app.get('/posts', getAllPosts);
app.get('/post/:postId', getOnePost);
app.get('/post', auth, getAllPostsByUserId);
app.post('/post', auth,createPost);
app.delete('/post/:postId', auth,deletePost);
app.put('/post/:postId', auth,editPost);

app.post('/login', loginUser);
app.post('/signup',signupUser);
app.post('/user/image', auth, uploadProfilePhoto);
app.get('/user', auth, getUserDetail);
app.post('/user', auth, updateUserDetails);

 app.post('/user/follow/:userId', auth, followUser);
 app.get('/user/follow', auth, getFollowers);
// app.post('/post/:id/like', auth, likePost);
// app.post('/post/:id/share', auth, sharePost);
// app.get('/post/query', searchPosts);
// app.get('/user/query', findUsers);


exports.api = functions.https.onRequest(app);
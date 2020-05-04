const { db } = require('../util/admin');


exports.getAllPosts = (req, res) => {
  db.collection("posts")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let posts = [];
      data.forEach((document) => {
        posts.push({
          postId: document.id,
          title: document.data().title,
          description: document.data().description,
          body: document.data().body,
          createdAt: document.data().createdAt,
        });
      });

      return res.json(posts);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ Error: err.code });
    });
};

exports.createPost = (req, res) => {
   
    if(req.body.body.trim() === '')
        return res.status(400).json({ body: 'Must not be empty!' });
   
    if(req.body.title.trim() === '')
        return res.status(400).json({ title: 'Must not be empty!' });

    const newPostItem = {
        ...req.body,
        createdAt: new Date().toISOString()
    };

    db.collection('posts')
      .add(newPostItem)
      .then((document) => {
          const resPostItem = newPostItem;
          resPostItem.id = document.id;
          return res.json(resPostItem);
      })
      .catch((err) => {
          res.status(500).json({ error: 'Something went wrong!!!' });
          console.error(err);
      });

}

exports.deletePost = (req, res) => 
{
    const document = db.doc(`/posts/${req.params.postId}`);

    document.get()
            .then((doc) => {
          
                if(!doc.exists)
                    return res.status(404).json({error: 'Post not found'});
                
                return document.delete();
            })
            .then(() => {
                res.json({message: 'Delete Succesfull'});
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).json({error: err.code});
            })
}

exports.editPost = (req, res) => 
{
    if(req.body.postId || req.body.createdAt)
        res.status(403).json({message: 'Not allowed to edit!'});

    let document = db.collection('posts').doc(`${req.params.postId}`);

    document.update(req.body)
            .then(() => {
                res.json({message: 'Updated Succesfully!!!'});
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).json({
                    error: err.code
                });
            })
}
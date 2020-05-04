const { admin, db } = require('../util/admin');
const firebaseConfig = require('../util/config');

const firebase = require('firebase');

firebase.initializeApp(firebaseConfig);

const { validateLoginData, validateSignupData } = require('../util/validators');

exports.loginUser = (req, res) => 
{
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    const { valid, errors } = validateLoginData(user);
    if(!valid) return res.status(400).json(errors);

    firebase.auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then((data) => {
                return data.user.getIdToken();
            })
            .then((token) => {
                return res.json({token});
            })
            .catch((err) => {
                console.error(err);
                return res.status(403).json({general: 'Wrong credentials, please try again!'});
            })

}

exports.signupUser = (req, res) => 
{
    const newUser = {
        ...req.body
    };
    console.log(newUser);
    const { valid, errors } = validateSignupData(newUser);

    if(!valid) return res.status(400).json(errors);

    let token, userId;

    db.doc(`/users/${newUser.username}`)
      .get()
      .then((doc) => {
          if(doc.exists)
            return res.status(400).json({ username: 'This username is already taken '});
          else
            return firebase.auth()
                           .createUserWithEmailAndPassword(
                               newUser.email,
                               newUser.password
                           );
      })
      .then((data) => {
          userId = data.user.uid;
          return data.user.getIdToken();
      })
      .then((idtoken) => {
          token = idtoken;
          const userCredentials = {
              ...newUser,
              createdAt: new Date().toISOString(),
              userId
          }
          delete userCredentials.password;
          delete userCredentials.confirmPassword;

          return db.doc(`/users/${newUser.username}`)
                   .set(userCredentials);
      })
      .then(() => {
          return res.status(201).json({token});
      })
      .catch((err) => {
            console.error(err);

            if(err.code === 'auth/email-already-in-use')
                return res.status(400).json({email: 'Email already in use'});
            else   
                return res.status(500).json({general: 'Something went wrong, please try again'});
      })
}

deleteImage = (imageName) => 
{
    const bucket = admin.storage().bucket();
    const path = `${imageName}`;
    
    return bucket.file(path).delete()
                 .then(() => {
                     return
                 })
                 .catch(err => {
                     return 
                 })
}


exports.uploadProfilePhoto = (req, res) => 
{
    const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');
    
    const busboy = new BusBoy({ headers: req.headers });

    let imgFileName;
    let imageToBeUploaded = {};

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        if(mimetype !== 'image/png' && mimetype !== 'image/jpeg')
            return res.status(400).json({err: 'Wrong file type submited'});

        const imageExtension = filename.split('.')[filename.split('.').length - 1];

        imgFileName = `${req.user.username}.${imageExtension}`;
        const filePath = path.join(os.tmpdir(), imgFileName);
        imageToBeUploaded = {filePath, mimetype};
        file.pipe(fs.createWriteStream(filePath));
    });

    deleteImage(imgFileName);
    busboy.on('finish', () => {
        admin.storage()
             .bucket()
             .upload(imageToBeUploaded.filePath, {
                 resumable: false,
                 metadata: {
                     metadata: {
                         contentType: imageToBeUploaded.mimetype
                     }
                 }
             })
             .then(() => {
                 const imgUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imgFileName}?alt=media`;

                 return db.doc(`/users/${req.user.username}`).update({
                     imgUrl
                 })
             })
             .then(() => {
                return res.json({ message: 'Image uploaded successfully'});
             })
             .catch((err) => {
                 console.error(err);
                 return res.status(500).json({error: err.code})
             })
    })
    busboy.end(req.rawBody);
}   

exports.getUserDetail = (req, res) => 
{
    let userData = {};

    db.doc(`/users/${req.user.username}`)
      .get()
      .then(doc => {
          if(doc.exists)
          {
              userData.userCredentials = doc.data();
              return res.json(userData);
          }
      })
      .catch(err => {
          console.error(err);
          return res.status(500).json({error: err.code});
      })
}

exports.updateUserDetails = (req, res) => 
{
    let document = db.collection('users').doc(`${req.user.username}`);
    document.update(req.body)
            .then(() => {
                res.json({message: 'Updated Succesfully...'});
            })
            .catch(err => {
                console.error(err);
                return res.status(500).json({
                    message: "Cannot update value"
                })
            })
}
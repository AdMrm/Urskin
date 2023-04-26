const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User');
const Post = require('./models/post');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');


const salt = bcrypt.genSaltSync(10);
const secret = 'asdfe45we45w345wegw3';



app.use(cors({credentials: true, origin: 'https://urskinbymrm.netlify.app/'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

 
mongoose.connect('mongodb+srv://Urskin:wZXxx4eeMOQgoV6M@cluster0.c3om5qo.mongodb.net/?retryWrites=true&w=majority')

app.post('/register', async (req,res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password:bcrypt.hashSync(password,salt),
    });
    res.json(userDoc);
  } catch(e) {
    console.log(e);
    res.status(400).json(e);
  }
});

  
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        // logged in
        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id: userDoc._id,
                username,
            });
        });    
    } else {
        res.status(400).json('wrong credentials');
    }
});




app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});



app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok'); //stting the token to an empty string
})


app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext;
  fs.renameSync(path, newPath);
 
  
   const {token} = req.cookies;
  jwt.verify(token, secret, {},async (err,info) => {
    if (err) throw err;
     const { title, summary, content } = req.body;
     const postDoc = await Post.create({
    title,
    summary,
    content,
    cover: newPath,
    author:info.id,
  });
  res.json(postDoc);
    
  });  

});

app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
  let newPath = null;
  if (req.file) {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path+'.'+ext;
    fs.renameSync(path, newPath); 
  } 

  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err,info) => {
    if (err) throw err;
    const {id,title,summary,content} = req.body;
    const postDoc = await Post.findById(id);
     const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
     if (!isAuthor) { 
      return res.status(400).json('you are not the author');
    }
      await postDoc.updateOne({
        title, summary, content,
        cover: newPath ? newPath : postDoc.cover,
      });
  res.json(postDoc);
    
  });
})



app.get('/post', async (req,res) => {
  res.json(
    await Post.find()
      .populate('author', ['username'])
      .sort({createdAt: -1})
      .limit(20)
  );
});
 
app.get('/post/:id', async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post
    .findById(id)
    .populate('author', ['username']);
  res.json(postDoc);
});
            
app.get('/search', async (req, res, next) => {
  // We look for a query parameter "search"
  const { search } = req.query;
  let posts;
  if (search) { // If search exists, the user typed in the search bar
    posts = await Post.aggregate(
      [  
        {
          '$search': {
            'index': 'default', 
            'autocomplete': {
              'query': search, // noticed we assign a dynamic value to "query"
              'path': 'title',
            }
          }
        }, {
          '$limit': 5
        }, {
          '$project': {
            '_id': 1, 
            'title': 1, 
            'author': 1, 
            'createdAt': 1,
          }
        }
      ]
    );
  } else { // The search is empty so the value of "search" is undefined
    posts = await Post.find().sort({ createdAt: 'desc' });
  }

  return res.status(200).json({
    statusCode: 200,
    message: 'Fetched posts',
    data: { posts },
  });  
});

app.listen(4000);
//wZXxx4eeMOQgoV6M   Urskin
   
//mongodb+srv://Urskin:wZXxx4eeMOQgoV6M@cluster0.c3om5qo.mongodb.net/?retryWrites=true&w=majority

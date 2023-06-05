const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
   const username = req.body.username;
  const password = req.body.password;
  if(username && password){
      if(!isValid(username)){
        users.push({"username": username, "password": password})
        res.status(400).json({message : "the username is registered, you can login now"})
      }
      else {
          res.status(400).json({message : "username already exits can't Login"})
      }
  }
  return res.status(300).json({message: "Unable to register!!@@"});
  // return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
// public_users.get('/',function (req, res) {
//   //Write your code here
//   res.send(JSON.stringify(books));

//   return res.status(300).json({message: "Yet to be implemented"});
// });

//get the book list using ASYNC callback function

public_users.get('/',async function (req, res) {
  //Write your code here
  const resdata = books
  const ctoj = await JSON.stringify(resdata);
  res.send(ctoj);
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
// public_users.get('/isbn/:isbn',function (req, res) {
//   //Write your code here
//   const isbn = req.params.isbn;
//   res.send(books[isbn])
//   return res.status(300).json({message: "Yet to be implemented"});
//  });

// Get book details bases on ISBN using ASYNC function

public_users.get('/isbn/:isbn', async function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const fetchbookdetailsonisbn = await  books[isbn];
  res.send(fetchbookdetailsonisbn)
  return res.status(300).json({message: "Yet to be implemented"});
 });

// Get book details based on author
// public_users.get('/author/:author',function (req, res) {
//   //Write your code here
//   const authorname = req.params.author;
//    Object.entries(books).forEach(x =>{
//        const [key ,val] = x
//        if(val.author === authorname )
//        res.send(val)
//    })

//   return res.status(300).json({message: "Yet to be implemented"});
// });

//Get book bases on author using async await fucntion

public_users.get('/author/:author',async function (req, res) {
  //Write your code here
  const authorname = await req.params.author;
  Object.entries(books).forEach(x =>{
       const [key ,val] =  x
       if(val.author === authorname )
       res.send(val)
   })
  })
 
  
// Get all books based on title
// public_users.get('/title/:title',function (req, res) {
//   //Write your code here
//   const titlename = req.params.title;
//   Object.entries(books).forEach(Y=>{
//       const [key ,val] = Y;
//       if(val.title === titlename )
//       res.send(val)   
//   })
//   return res.status(300).json({message: "Yet to be implemented"});
// });


//Get all books bases on title using async await function

public_users.get('/title/:title', async function (req, res) {
  //Write your code here
  const titlename = await req.params.title;
  Object.entries(books).forEach(Y=>{
      const [key ,val] = Y;
      if(val.title === titlename )
      res.send(val)   
  })
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  Object.entries(books).forEach( t=>{
      const [key, val] = t;
      if(key === isbn)
      res.send(val.reviews)
  })
  return res.status(300).json({message: "Yet to be implemented"});
});



module.exports.general = public_users;

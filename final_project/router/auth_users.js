const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{"username" : "goutamkrkr", "password": "thisisgoutam"}, {"username": "shyam" , "password": "thisisshyam"}];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
const presntinlist = users.filter((user)=>{
    user.username === username
});
if(presntinlist.length > 0){
    return true
}
else{
    return false
}
}

const authenticatedUser = (username,password)=>{ //returns boolean
    const credentialsmatch = users.filter((user)=>{
        return( user.username === username && user.password === password)
    })

    if(credentialsmatch.length > 0){
        return true
    }
    else{
        return false
    }
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if(!username || !password){
      res.status(404).json({message :"the username and pasword not entered!"})  
  }
  if(authenticatedUser(username,password)){
      let accessToken = jwt.sign({
          data: password}, 'access' , {expiresIn : 60 * 60}
      )

      req.session.authorization = {
        accessToken,username
    }
    return res.status(200).json({message :"Login Sucessully done! and session is generated"})
  }
  else{
    return res.status(300).json({message: "not authorized"});

  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

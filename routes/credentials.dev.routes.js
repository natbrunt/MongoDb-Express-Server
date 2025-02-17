const express     = require('express'),
    router        = express.Router();

const VerifiedUser = require("../models/VerifiedUser") 


const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const argon2 = require("argon2");


async function login(req, res) {
 let { 
     username: _username, 
     password: _password 
 } = req.body;
 
try {       
  const user = await VerifiedUser.findOne({ username: _username });   
    
  if (!user) return res.status(404).json({ ok: false, message: "Invalid credentials" });
    
  const match = await argon2.verify(user.password, _password);
    
  if (match) {
   
    //const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h",});
   
    if (user.admin == true){
          res.json({ ok: true, message: "Login success", admin: true });   
    } else {
          res.json({ ok: true, message: "Login success", admin: false });
    }
    
  } else {
    res.status(401).json({ ok: false, message: "Invalid credentials" });
  }
 } catch (e) {
   console.error(e);
   res.status(500).json({ ok: false, message: "An error occurred during login" });
 }
}


async function addUser(req, res) {
    
 const salt = crypto.randomBytes(16).toString("hex");   
 
 let { 
     username: _username, 
     password: _password,
     adminPassword: _adminPassword,
     admin: _admin
 } = req.body;
 
 try {
  if (_adminPassword !== process.env.ADMINPASSWORD) return res.status(400).json({ok: false, message: "Invalid admin password"})
     
  const user = await VerifiedUser.findOne({ username: _username });      
  
  if (user) return res.status(400).json({ ok: false, message: "Username already taken" });
  
  // if (!validator.isEmail(name)) return res.status(400).json({ ok: false, message: "Invalid email provided" });
  
  const hash = await argon2.hash(_password, { salt: Buffer.from(salt) });

  let adminBool = JSON.parse(_admin)
     
  const user_added = await VerifiedUser.create({
   username: _username,
   password: hash,
   admin: adminBool
  });
  
  res.status(201).json({ message: "User successfully added" });
 } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, message: "An error occurred while adding the user" });
 }
}

// async verifyToken(req, res) {
    
//     const token = req.headers.authorization?.split(" ")[1]; // Extract token from Bearer scheme

//     if (!token) {
//         return res.status(401).json({ ok: false, message: "Token is missing" });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, myToken) => {
//         if (err) {
//             return res.status(403).json({ ok: false, message: "Token is corrupted" });
//         }
//         res.json({ ok: true, data: myToken });
//     });
// }
// };


router.post('/login', login);
router.post('/addUser', addUser);


module.exports = router;

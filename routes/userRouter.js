const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/userModel');

// Login Router to login a user
   router.post('/login', async (req, res)=> {
   try {
      const {email, password} = req.body;
      //validate

      if(!email || !password) {
         return res.status(400).json({msg: "all fields are required"})
      }

      // to check the password is associated with the same account
      const user = await User.findOne({ email: email })
      if (!user) {
         return res.status(400).json({ msg: "no account with this email is registered" })
      }

      //jwt token for authentication
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      res.json ({
         token,
         user: {
            id: user._id,
            // name: user.name,
            email: user.email,
         },
      })
      } catch (err) {
         res.status(500).json({ error: err.message })
      }
   })

// to verify jwt token
   router.post("/tokenIsValid", async(req, res)=>{
      try {
         const token = req.header("x-auth-token")
         if(!token) {
            return res.json(false)
         }

         const verified = jwt.verify(token, process.env.JWT_SECRET)
         if(!verified) {
            return res.json(false)
         }

         const user = await User.findById(verified.id)
         if(!user) return res.json(false);

         return res.json(true)
         
      } catch (err) {
         res.status(500).json({ error: err.message })
      }
   })
//Get logged in user
   router.get("/", auth, async (req, res)=> {
      const user = await User.findById(req.user);
      res.json(user);
   })

   module.exports = router;

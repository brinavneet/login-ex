const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
   email:{
      type: String,
      required: true,
      unique: true
   },
   password:{
      type: String,
      required: true,
      minLength: 6
   }
})

module.exports = User = mongoose.model("users", userSchema);
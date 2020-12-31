const express = require ('express');
const mongoose = require ('mongoose');
const cors = require('cors');
require('dotenv').config();

//set up express
const app = express();
app.use(express.json());
app.use(cors());

//for deployment
const PORT = process.env.PORT || 5000;

//starting up the server
app.listen(PORT, ()=> console.log(`The server is running on port: ${PORT}`));

//setting up mongoose
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, 
   {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true

   }, (err) => {
         if (err) throw err;
         console.log("MongoDB connected");
      }
);

//setup routes
app.use("/users", require ('./routes/userRouter'))
//server.js, connects database
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
// add type ="module" replace const express = require('express')
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
//a top-level function exported by the express module.


app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes); 
//This code is a middleware, it makes every routes starts with posts,
// meaning the initial url is http://localhost.:5000/posts

app.use('/user', userRoutes);
// note that express.json has replaced bodyParser.json in latest release.


const CONNECTION_URL = 'mongodb+srv://FengZhuo_Final_Proj:8995771a@finalprojdatabase.ahwlh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;
//for real projs, create a file called .env, and put your port and COONECTION_URL in there.
// and then import into this file. Remember to install dotenv, and call it.

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () =>
    console.log(`Server Running on Port: ${PORT}`)
  )).catch(
    (error) => console.log(error.message)
  );
//now, database is connected to the server



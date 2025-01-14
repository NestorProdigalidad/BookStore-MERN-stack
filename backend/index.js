import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import {Book} from "./models/bookModel.js";
import booksRoute from './routes/bookRoutes.js';
import cors from 'cors';

const app = express();

//Middleware for parsing request body, allows express to use json 
app.use(express.json());

//Middleware for handling CORS policy
//Option 1: Allow all origins with default of Cors(*)
app.use(cors());



//Welcome page
app.get('/' , (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to MERN Stack Tutorial');
});

//route to 
app.use('/books', booksRoute);

//Connecting to Mongo database
mongoose
    .connect(mongoDBURL)
    .then(()=> {
        console.log('App connected to database');    
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}` );
        });
    })
    .catch((error) =>{
        console.log(error);

    });
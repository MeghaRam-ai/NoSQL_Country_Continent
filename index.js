require('dotenv').config()
const express = require('express');// import express from the library
require('./config/database');

const CountryModel= require('./models/Country'); 

const countriesRoutes = require('./routes/countries');
const continentsRoutes = require('./routes/continents')

const app = express(); // create it for a app
app.use(express.json())//it wil take the req and put it in variable

app.use('/countries',countriesRoutes);
app.use('/continents', continentsRoutes);

app.get('/',(req,res) => {
    return res.status(200).json({msg:"Hello checking connection...."})
})
app.get('/to_do',(req,res) => {
    return res.status(200).json({msg:"Hello checking to do's...."})
})

const port = 3000;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});// app started and ready to get request from 3000

// createv a new entry point inside our api..........

const express = require('express');
const router = express.Router()

const ContinentModel = require('../models/Continent')


router.post('/add',async(req,res)=>{
    
    
    // let countries= [req.body.countries]
    console.log(req)

    const continent= await ContinentModel.create({
        c_name : req.body.c_name
        // countries : countries
    })
    
    return res.status(200).json({"msg":continent});
});


// list of continents
router.get('/', async (request, response) => {
    const continents = await ContinentModel.find().populate('countries');
    
    response.status(200).json(continents);
});

module.exports = router;
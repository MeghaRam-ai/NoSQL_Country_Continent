const express = require('express');
const router = express.Router()

const ContinentModel = require('../models/Continent')


router.post('/add',async(req,res)=>{
    //check the id and update
    
    console.log(req)
    const continent= await ContinentModel.update({
        query: {
                c_name : req.body.c_name,
                countries: req.body.countries 
            },
        
        upsert: true 
    })
    return res.status(200).json({"msg":continent});
});


// list of continents
router.get('/', async (request, response) => {
    const continents = await ContinentModel.find().populate('countries');
    
    response.status(200).json(continents);
});



// to delete
router.delete('/:id',async(req,res)=>{
    const continent_id = req.params.id;
    await ContinentModel.findByIdAndDelete({
        _id: continent_id
    });

    return res.status(200).json({msg: "Continent Deleted!"});
})

module.exports = router;
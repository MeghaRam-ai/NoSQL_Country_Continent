const express = require('express');
const router = express.Router();// manage get , post etc, instead of directly pass app in index.js. its just like routing control flow
module.exports = router;
const CountryModel= require('../models/Country'); // to import contry model



// get all values from the url
router.get('/',async(req,res)=>{
    const countries= await CountryModel.find().populate('continent');
    return res.status(200).json(countries);
});


// get countries starting with some values, or given id

router.get('/contains/:filter_text',async(req,res)=>{
    const filter_text = req.params.filter_text;
    const filter_text_reg=new RegExp(filter_text)
    const countries = await CountryModel.find({ // return one record, not an array of docs
        name: {$regex:filter_text_reg}
    }).populate('continent');
    return res.status(200).json(countries);


});









// not optimized
    // const countries_count =  await CountryModel.find();
    // return res.status(200).json({msg:"countries_count: "+ countries_count.length});

    //count() -> optimised, better
// get count of countries
router.get('/count',async(req,res)=>{
    const countries_count= await CountryModel.count();
    return res.status(200).json({msg: "countries count: "+countries_count});
});

// to create data inside db-> post
router.post('/', async (req,res)=>{// async used bec we used await. wait req async connection

    //await to wait for the return value
    
    console.log(req.body);
    const {name,isoCode} = req.body
    continent=req.body.continent
    // console.log(req.body.continent);
    //country-> value returned to the country obj
    const country = await CountryModel.create({ //we dont know how ling it will take to return the respose, so use await
        name:name, //req.body.name if not using const {name,isoCode} = req.body
        isoCode:isoCode,
        continent:continent
    })


    //without using await
    // CountryModel.create({ //we dont know how ling it will take to return the respose, so use await
    //     names:name, //req.body.name if not using const {name,isoCode} = req.body
    //     isoCode:isoCode
    // }).then(res.status(200).json({"msg":country}) //return the obj country)


    return res.status(200).json({"msg":country});
})


// get all values from the url
router.get('/:id',async(req,res)=>{
    const country_id = req.params.id;
    const countries = await CountryModel.findOne({ // return one record, not an array of docs
        _id: country_id // find all the doc whose id is given id
    }).populate('continent');
    return res.status(200).json(countries);
});

// to delete
router.delete('/:id',async(req,res)=>{
    const country_id = req.params.id;
    await CountryModel.findByIdAndDelete({
        _id: country_id
    });

    return res.status(200).json({msg: "Country Deleted!"});
})


//change the value of record whose id is given id and rerun new updated record
router.put('/:id',async(req,res)=>{
    const country_id = req.params.id;
    const {name,isoCode} = req.body
    continent=req.body.continent
    
    if(name && isoCode){
        const country= await CountryModel.findByIdAndUpdate({
            _id:country_id
        },{
            name,
            isoCode,
            continent
        },{
            new: true 
        });
        return res.status(200).json(country);
    }else{
        return res.status(200).json({msg:"not find all params"});
    }
    
});

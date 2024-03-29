const mongoose= require('mongoose');

const Country = mongoose.model('Country',{
    name: {
        type: String,
        required: true
    },
    isoCode: {
        type:String
    },
    population:{
        type: Number
    },
    continent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Continent'
    }
});

module.exports = Country; //to use Country model somewhere else

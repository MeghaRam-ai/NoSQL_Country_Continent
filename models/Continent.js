const mongoose= require('mongoose');

const Continent = mongoose.model('Continent', {
    c_name: {
        type: String,
        required: true
        // unique: true
    },
    countries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'// model we needto connect. 
    }]
});

module.exports = Continent; //to use Country model somewhere else

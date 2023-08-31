 // make this available to our users in our Node applications
const mongoose = require('mongoose'),
Schema = mongoose.Schema;

 

const schema = new Schema({
    brand:{type:String},
    model:{type:String},
});

module.exports = mongoose.model('autos', schema)
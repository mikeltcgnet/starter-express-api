 // make this available to our users in our Node applications
const mongoose = require('mongoose'),
Schema = mongoose.Schema;

 

const schema = new Schema({
    firstName: { type: String},
    lastName: { type: String},
     partners:[{
        firstName: { type: String},
        lastName: { type: String},
        DOB: {type: Date},
        dateStarted:{type: Date},
        dateEnded:{type: Date}
    }]
});

module.exports = mongoose.model('relationships', schema)
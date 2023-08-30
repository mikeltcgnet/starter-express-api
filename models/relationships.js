 // make this available to our users in our Node applications
const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const partnerSchema = new Schema({
    name: String, // String is shorthand for {type: String}
    DOB: Date,
    DateStarted:Date,
    DateEnded:Date,
    relationships:[{
        firstName: { type: String},
        lastName: { type: String}
    }]
});

const relationshipsSchema = new Schema({
    firstName: { type: String},
    lastName: { type: String},
     partners:[{
        firstName: { type: String},
        lastName: { type: String},
        DOB: Date,
        DateStarted:Date,
        DateEnded:Date,
    }]
});

module.exports = mongoose.model('relationships', relationshipsSchema)
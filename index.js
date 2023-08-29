const mongoose = require('mongoose');
const express = require('express')
const app = express()
// Define the database URL to connect to.
const mongoDB = process.env.DB_CONNECTION_STRING;
app.all('/', (req, res) => {
    main();
    console.log("Just got a request!")
    console.log(process.env.DB_CONNECTION_STRING)
    res.send('Yo!')
})

// Import the mongoose module
 

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set("strictQuery", false);

const { Schema } = mongoose;


const customerSchema = new Schema({
  first: String, // String is shorthand for {type: String}
  last: String,
  email:String,
  });
const CustomerModel = mongoose.model('customer', customerSchema);

newCust = CustomerModel.create({ first: 'Mike', last:"Leon",email:"mleon@gmail.com"});
const partnerSchema = new Schema({
    name: String, // String is shorthand for {type: String}
    DOB: Date,
    DateStarted:Date,
    DateEnded:Date,
    customer: {
      type: Schema.Types.ObjectId,
      ref: "customer"
    }
    });
    const PartnerModel = mongoose.model('partner', partnerSchema);
    
    // Wait for database to connect, logging an error if there is a problem
    main().catch((err) => console.log(err));
    async function main() {
        await mongoose.connect(mongoDB);
        const person = await CustomerModel.findOne({ last: 'Leon' }).exec();
        PartnerModel.create({ customer:person.id, name: 'Linda Smith', DOB:'1/1/2000', DateStarted: '3/2/2022', DateEnded:'3/3/2022'});
    console.log('name is '+ person);
    
    const partnerWithData = await PartnerModel.findOne({ DOB: '1/1/2000' })
    .populate("customer")
console.log(""+partnerWithData);
   
}

app.listen(process.env.PORT || 3000)
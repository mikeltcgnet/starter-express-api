const mongoose = require('mongoose');
const express = require('express')
const app = express()
// Define the database URL to connect to.
const mongoDB = process.env.DB_CONNECTION_STRING;

app.all('/', (req, res) => {
    console.log("Just got a request!")
    main();
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

//newCust = CustomerModel.create({ first: 'Mike', last:"Leon",email:"mleon@gmail.com"});
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
   // main().catch((err) => console.log(err));
    function main() {
      try{
       
        console.log('try to person found');
        const person = CustomerModel.findOne({ last: 'Leon' }).exec();
        console.log('person found');
        console.log('name is '+ person);
        PartnerModel.create({ customer:person.id, name: 'Linda Smith', DOB:'1/1/2000', DateStarted: '3/2/2022', DateEnded:'3/3/2022'});
        console.log('smith created');
      } catch  (err){
        console.log('ERROR connecting:'+  err);
        return false;
      }
    }

      try{
        console.log('trying to connect to mongo...');
        // const mongoDB = process.env.DB_CONNECTION_STRING;
        const mongoDB = "mongodb+srv://admin:P%23ssword1212@relationshipcluster.k27hm3q.mongodb.net/Relationships";
         mongoose.connect(mongoDB);
         console.log('connected to mongo');
        console.log("start listening");
        app.listen(process.env.PORT || 3000,() => {
          console.log("listening for requests");
      });
      } catch  (err){
        console.log('ERROR connecting:'+  err);
        return false;
        }
       
    
    

 
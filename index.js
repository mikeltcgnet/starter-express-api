const mongoose = require('mongoose');
const express = require('express');
const relationshipModel = require('./models/relationships');
const routes = require('./routes/routes');
// Define the database URL to connect to.
const mongoDB = process.env.DB_CONNECTION_STRING;

const app = express()
app.use(express.json());  //needs to be before root
app.use('/api', routes);
app.get('/', (req, res) => {
  createRelationshipsTable();
    main();
    console.log("Just got a request!")
    console.log(process.env.DB_CONNECTION_STRING)
    res.send('Yo!')
})

 
 

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set("strictQuery", false);

 try{
        mongoose.connect(mongoDB);
        const database = mongoose.connection;
         
        console.log('trying db connection');
        database.once('connected', () => {
          console.log('Database Connected');
          try{
            console.log("start listening");
            app.listen(process.env.PORT || 3000,() => {
              console.log("listening for requests");
          });
          } catch  (err){
            console.log('ERROR starting to listen:'+  err);
              return false;
            }
 })
         
      } catch  (err){
        console.log('ERROR connecting:'+  err);
        return false;
      }

 
 
    async function main() {
      try{
        //await mongoose.connect(mongoDB);
        console.log('connected');
        const person = await relationshipModel.findOne({ last: 'Smithers' }).exec();
        console.log('person found');
        console.log('name is '+ person);
         
      } catch  (err){
        console.log('ERROR connecting:'+  err);
        exit;
      }
    }

     
       
    function createRelationshipsTable(){
      
      relationshipModel.create({ firstName: 'Linda', lastName:'Smithers', partners:[{firstName:"Mike", lastName:"Leon"}, {firstName:"Tom", lastName:"Leonard", DOB:'1/1/2000', DateStarted: '3/2/2022', DateEnded:'3/3/2022'}]});
    }
    
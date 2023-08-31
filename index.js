require('dotenv').config()
//console.log(process.env);
const mongoose = require('mongoose');
const express = require('express');
const relationshipModel = require('./models/relationships');
const routes_relationships = require('./routes/relationshipRoutes');
const routes_autos = require('./routes/autoRoutes');
 
const mongoDB_conn = process.env.MONGO_CONN;
 

const app = express()
app.use(express.json());  //needs to be before root
app.use('/relationships', routes_relationships);
app.use('/autos', routes_autos);
 
mongoose.set("strictQuery", false);

 try{
        mongoose.connect(mongoDB_conn);
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
 
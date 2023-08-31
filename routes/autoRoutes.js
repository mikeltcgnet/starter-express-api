const express = require('express');
const model = require('../models/autos');

const router = express.Router()
//Post Method
router.post('/post', async(req, res) => {
    const auto = req.body;
    const data = new model({
        brand: auto.brand
    })

    try{
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch(error){
        console.log("Just got a error!"+ error)
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try{
        const data = await model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API')
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})
module.exports = router;
const express = require('express');
const relationshipModel = require('../models/relationships');

const router = express.Router()
//Post Method
router.post('/post', async(req, res) => {
    const rel = req.body;
    const data = new relationshipModel({
        firstName: rel.firstName,
        lastName: rel.lastName,  
        partners:[{
            firstName: rel.partners[0].firstName,
            lastName: rel.partners[0].lastName,
            DOB: rel.partners[0].DOB,
            dateStarted:rel.partners[0].dateStarted,
            dateEnded:rel.partners[0].dateEnded
        }]

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
router.get('/getAll', (req, res) => {
    res.send('Get All API')
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
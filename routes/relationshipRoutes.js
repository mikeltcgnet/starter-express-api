const express = require('express');
const model = require('../models/relationships');

const router = express.Router()
//Post Method
router.post('/post', async(req, res) => {
    
    const rel = req.body;
    const data = new model({
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
router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.post('/addPartner/:id', async (req, res) => {
    const id = req.params.id;
    const newPartner = req.body;
    const options = { new: true };
    const user = await model.findById(req.params.id);
    user.partners.push(newPartner);
     
    try{
        const result = await model.findByIdAndUpdate(
            id, user, options
        )
        res.status(200).json(user)
    }
    catch(error){
        console.log("Just got a error!"+ error)
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
module.exports = router;
const pCloudSdk = require('pcloud-sdk-js');
const multer = require('multer');
const storage= multer.memoryStorage();
const upload = multer({storage: storage});
const streamifier = require('streamifier');
const Readable = require('stream');
const express = require('express');
const axios = require('axios')
const FormData = require('form-data');
const fs = require('fs');
const model = require('../models/relationships');
const pcloudToken = 'nbPD7Z6KsHoSQb6auZx31bykZG6S2MoQz85kraAE78Ar0u8y2FqOV';

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
//upload using axios stream

router.post('/photousingaxiosstream',upload.single('image'), async(req, res)=>{
    const writeStream = fs.createWriteStream('file4.png');
    const readStream = streamifier.createReadStream(req.file.buffer);
    readStream.pipe(writeStream);
    response = await uploadStreamedPhoto(fs.createReadStream('file4.png'),'newfile');
    
    console.log(JSON.stringify(response.data));
    res.status(200).json(response.data);
    });

//upload using axios
router.post('/photousingaxios', async(req, res)=>{
    
response = await uploadStreamedPhoto(fs.createReadStream('F:/f.html'),'newfile');

console.log(JSON.stringify(response.data));
res.status(200).json(response.data);
});
   

//upload photo
router.post('/photo',upload.single('image'),(req,res)=>{
 //   console.log(req.body);
  // console.log(req.file);
 //   var f = req.file;
   var buf = req.file.buffer.toString('base64');
   //console.log(buf);
   // Upload code Here
 uploadPhoto(buf);
res.status(200).json({"result":"ok"});
});

//upload photo
router.post('/getFolder', async (req, res) => {
    let folder = await getRelationshipsFolder();
        console.log(folder);
        uploadPhoto();
        await listFolders();
     res.status(200).json(listFolders());
    
    
 });
 
async function listFolders(){
    client = pCloudSdk.createClient(pcloudToken);
    locationid =   1;
    return await client.listfolder(); 
     
    
  }

  async function getRelationshipsFolder(){
    client = pCloudSdk.createClient(pcloudToken);
    locationid =   1;
    let allFolders = await client.listfolder();
    return allFolders.contents.find(f=>f.name=="relationships"); 
  
    
  }      

 async function uploadStreamedPhoto(stream, fileName){
    let data = new FormData();
data.append('', stream);

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.pcloud.com/uploadfile?auth=7iQueXZnbPD7ZDDjkhTR3n745LIhVv2JV1XFNWlXV&path=/relationships&filename='+fileName,
        headers: { 
          ...data.getHeaders()
        },
        data : data
      };
      
     return await axios.request(config);
       
     
   
  }
  async function uploadPhoto(image){
     let file = "./f.html";     
    client = pCloudSdk.createClient(pcloudToken);
    locationid =   1;
    client.upload(file,"18592336246", {
        onBegin: function() {
          console.log('Upload started.');
        },
        onProgress: function(progress) {
          console.log(progress.direction, progress.loaded, progress.total);
        },
        onFinish: function(uploadData) {
     //     console.log(uploadData);
        }
      });
    
 }
 
module.exports = router;
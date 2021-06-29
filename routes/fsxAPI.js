const express = require('express')
const router = express.Router()
const AWS = require('aws-sdk')

AWS.config.update({region: 'us-east-1'});
  var params = {
};
var fsx = new AWS.FSx({apiVersion: '2018-03-01'});

router.get("/list", (req,res)=>{
   console.log("LIST API REQUEST MADE")
    fsx.describeFileSystems(params, function(err, data) {
        if (err){
            console.log(err, err.stack) // an error occurred
        }
        else{
            console.log(data)
            res.send(data)           // successful response
        }

    })
})
router.get("/delete", (req,res)=>{
   console.log("POST DELETE API REQUEST MADE")
   console.log(req.query.FileSystemId)
    var params = {
        FileSystemId: req.query.FileSystemId
       };
       fsx.deleteFileSystem(params, function(err, data) {
         if (err){
            console.log(err, err.stack);
            res.send(err) // an error occurred
         } 
         else{
            console.log(data);  
            res.send(data)         // successful response
         }
       });
})
router.post("/create", (req,res)=>{
   console.log("POST API FOR CREATING FILE SYSTEM REQUESTED")
   console.log(req.body)
   var params = req.body
       fsx.createFileSystem(params, function(err, data) {
         if (err){
            console.log(err, err.stack); // an error occurred
            res.send(err)
         }
         else{
            console.log(data);
            res.send(data)
         }   
        })
})

module.exports = router
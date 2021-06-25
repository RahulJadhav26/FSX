const express = require('express')
const router = express.Router()
const AWS = require('aws-sdk')

AWS.config.update({region: 'us-east-1'});
  var params = {
};
var fsx = new AWS.FSx({apiVersion: '2018-03-01'});

router.get("/list", (req,res)=>{
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
router.post("/delete", (req,res)=>{
    var params = {
        FileSystemId: req.body.FileSystemId
       };
       fsx.deleteFileSystem(params, function(err, data) {
         if (err){
            console.log(err, err.stack); // an error occurred
         } 
         else{
            console.log(data);  
            res.send(data)         // successful response
         }
       });
})
router.get("/create", (req,res)=>{
    var params = {
        ClientRequestToken: "a8ca07e4-61ec-4399-99f4-19853801bcd5", 
        FileSystemType: "WINDOWS", 
        KmsKeyId: "arn:aws:kms:us-east-1:012345678912:key/1111abcd-2222-3333-4444-55556666eeff", 
        SecurityGroupIds: [
           "sg-edcd9784"
        ], 
        StorageCapacity: 3200, 
        StorageType: "SSD", 
        SubnetIds: [
           "subnet-1234abcd"
        ], 
        Tags: [
           {
          Key: "Name", 
          Value: "MyFileSystem"
         }
        ], 
        WindowsConfiguration: {
         ActiveDirectoryId: "d-1234abcd12", 
         Aliases: [
            "accounting.corp.example.com"
         ], 
         AutomaticBackupRetentionDays: 30, 
         DailyAutomaticBackupStartTime: "05:00", 
         ThroughputCapacity: 32, 
         WeeklyMaintenanceStartTime: "1:05:00"
        }
       };
       fsx.createFileSystem(params, function(err, data) {
         if (err){
            console.log(err, err.stack); // an error occurred
         }
         else{
            console.log(data);
            res.send(data)
         }   
        })
})

module.exports = router
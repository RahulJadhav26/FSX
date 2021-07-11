const express = require('express')
const router = express.Router()
const AWS = require('aws-sdk')

AWS.config.update({region: 'us-east-1'});

// Create EC2 service object
var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

var params = {
};
router.get("/list", (req,res)=>{
    console.log("EC2 DESCRIBE API REQUEST MADE")
    // Call EC2 to retrieve policy for selected bucket
ec2.describeInstances(params, function(err, data) {
    if (err) {
      res.send(err.stack);
    } else {
      res.send(data)
    }
  });
})

module.exports = router
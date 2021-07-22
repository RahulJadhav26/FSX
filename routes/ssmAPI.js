const express = require('express')
const router = express.Router()
const AWS = require('aws-sdk')

AWS.config.update({region: 'us-east-1'})

var ssm = new AWS.SSM({apiVersion: '2014-11-06'})

router.post("/sendCommand", (req,res)=>{
    var params = req.body
    console.log(params)
  ssm.sendCommand(params, function(err, data) {
    if (err) res.send(err); // an error occurred
    else     res.send(data);           // successful response
  })
})
module.exports = router
const express = require('express')
const router = express.Router()
const AWS = require('aws-sdk')

AWS.config.update({region: 'us-east-1'});

s3 = new AWS.S3({apiVersion: '2006-03-01'});

router.get("/list", (req,res)=>{
  console.log("S3 LIST API REQUEST MADE")
    s3.listBuckets(function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data.Buckets);
          res.send(data.Buckets)
        }
      });
})
module.exports = router
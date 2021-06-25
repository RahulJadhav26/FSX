const express = require('express')
const router = express.Router()
const AWS = require('aws-sdk')

AWS.config.update({region: 'us-east-1'});
  var params = {
};
var fsx = new AWS.FSx({apiVersion: '2018-03-01'});
fsx.describeFileSystems(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response

})
router.get("/", (req,res)=>{
    res.send("welcome to route fsxAPI")
})

module.exports = router
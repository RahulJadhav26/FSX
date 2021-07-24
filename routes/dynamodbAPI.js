const express = require('express')
const router = express.Router()
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  endpoint: "http://dynamodb.us-east-1.amazon.com"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "mounts";
router.post("/create",(req,res)=>{
    var obj = req.body
    var params = {
        TableName:table,
        Item: obj
    }
    console.log("Adding a new item...");

    docClient.put(params, function(err, data) {
        if (err) {
            res.send(JSON.stringify(err, null, 2))
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            res.send(JSON.stringify(data, null, 2))
        }
    });
})
router.post("/delete",(req,res)=>{
    var obj = req.body
    var params = {
        TableName:table,
        Key: obj
    }
    console.log("Deleting a new item...");

    docClient.delete(params, function(err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
            res.send(JSON.stringify(err, null, 2))
        } else {
            console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
            res.send(JSON.stringify(data, null, 2))
        }
    });
})
module.exports = router

router.get('/list', (req,res)=>{
    var obj = req.body
    params = {
        TableName: table,
        Key:obj
    }
    console.log("Finding the item...");
    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            res.send(JSON.stringify(err, null, 2))
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            res.send(JSON.stringify(data, null, 2))
        }
    });
})
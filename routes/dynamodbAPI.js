const express = require('express')
const router = express.Router()
var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1"
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
    var paramscheck = {
        TableName:table,
        Key: {
            fileSystemId:obj.fileSystemId
        }
    }
    docClient.get(paramscheck, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            res.send(err)
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            console.log(data)
            if(data.Item) {
                console.log("Item Already present")
                res.send({status: false, msg:"Item already Present"})
            } else {
                docClient.put(params, function(err, data) {
                    if (err) {
                        res.send(err)
                        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        console.log("Added item:", JSON.stringify(data, null, 2));
                        res.send({status: true, msg:"Item Added successfully"})
                    }
                });
            }
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

    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            res.send(err)
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            if(data.Item){
                docClient.delete(params, function(err, data) {
                    if (err) {
                        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
                        res.send(err)
                    } else {
                        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
                        res.send({status: true, msg:"Item Deleted Successfully"})
                    }
                });
            } else{
                res.send({status:false,msg:"Item not found, No Delete operation done"})
            }
        }
    });

})
router.post('/list', (req,res)=>{
    var obj = req.body
    params = {
        TableName: table,
        Key:obj
    }
    console.log("Finding the item...");
    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            res.send(err)
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            if(data.Item){
                res.send({status:true, data:data})
            }else{
                res.send({status:false,msg:"No Items Found"})
            }
        }
    });
})

module.exports = router
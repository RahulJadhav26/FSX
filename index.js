const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv =require('dotenv')

dotenv.config()
const app = express()
const routes = require('./routes/fsxAPI')
// Middleware

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use('/fsx', routes)

app.get("/", (req,res)=>{
    res.status(200).send("Welcome to FSX Server")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server Started on port ${PORT}`)
})
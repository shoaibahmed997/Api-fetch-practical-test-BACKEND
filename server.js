// IMPORTS 
const fetch = require('node-fetch');
const express = require('express')
const cors = require('cors');
const { DB } = require('./database/db');
const Company = require('./models/Company')

// INITIALISE THE EXPRESS APP 
const app = express()
// app.use(cors()) // using cors in developemnt mode. I'm hosting the frontend (Create-React-App) with express itself so no need for cors
app.use(express.json()) // JSON body parser for parsing the incomming json request.
app.use(express.static('public')) // public is a static folder from where we will serve our react index file
const PORT = process.env.PORT || 5000

//  The FetchApi functions is made to facilitate as "another" solution for the api cors problem.
//  The backend (https://www.zaubacorp.com/) api provided to fetch the company data cannot be used directly
//  in frontend due to cors policy at https://www.zaubacorp.com/. So to counter that our node server can act as a 
// proxy server to make the network request.

// NOTE - THIS FUNCTIONS IS NOT USED IN THE APP 

// const fetchApi = ()=>{
// var FormData = require('form-data');
// const form  = new FormData()
// form.append("search","zauba")
// form.append("filter","company")
// console.log('fetching the api')
// fetch("https://www.zaubacorp.com/custom-search",{
//     method:"POST",
//     body:form,
//     encoding: null
// }).then(res=>{return res})
// }

// app.get('/search',(req,res)=>{
//     const response = fetchApi()
//     res.send(response)
// })


// THE API ENDPOINT FOR CREATING A NEW COMPANY ENTRY IN OUR DATABASE.
app.post("/api/create",async(req,res)=>{
    try {
        const {name,cin} =  req.body 
        const data = await Company.create({name,cin})
        console.log(data)
        res.status(200).json({msg:"Added to databse"})
    } catch (error) {
        res.status(503).json({error})
    }
})

// THE API ENDPOINT FOR 
app.get('/api/all',async(req,res)=>{
    try {
        const data = await Company.findAll()
        res.status(200).json({data:data})
    } catch (error) {
        res.status(500).json({error})
    }
})

// API ENDPOINT FOR DELETING A COMPANY FROM DATABASE. (Although it was not asked but i always provide more than expected! ;)
app.get('/api/delete/:cin',async(req,res)=>{
    try {
        const cin = req.params.cin
        console.log('the cin is',cin)
       const result= await Company.destroy({
            where:{
                cin:cin
            }
        })
        res.status(200).json({result})
        
    } catch (error) {
        res.status(503).json({error})
    }
})

//  THIS WILL SERVE OUR FRONTEND CODE.
app.get('*',(req,res)=>{
    res.sendFile(__dirname+"/public/index.html")
})

// SERVER LISTENING 
app.listen(PORT,()=>{
    DB.sync() // Initialize the database and create table if not exist
    console.log("server started on port 5000")
})

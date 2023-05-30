const express=require("express");
const flightrouter=express.Router();
const {Bookingmodel}=require("../model/user.model")
const {flightmodel}=require("../model/flight.model")

// ====================================> flight post route

flightrouter.post("/flights",async(req,res)=>{
    try {
        const data=req.body;
        let flightdata= new flightmodel(data)
        await flightdata.save();
        res.send("flightdata stored successfully")
    } catch (error) {
        res.status(201).send(error.message)
    }
})

// =========================================>get all flights data

flightrouter.get("/flights",async(req,res)=>{
    try {
        let flightdata= await flightmodel.find({})
        
        res.status(200).send(`${flightdata}`)
    } catch (error) {
        res.send(error.message)
    }
})

// =========================================>get single flight data by id 

flightrouter.get("/flights/:id",async(req,res)=>{
    try {
        let id=req.params.id
        let flightdata= await flightmodel.find({_id:id})
        
        res.status(200).send(`${flightdata}`)
    } catch (error) {
        res.send(error.message)
    }
})

//==========================================> patch flight details by id:

flightrouter.patch("/flights/:id",async(req,res)=>{
    try {
        let body=req.body
        let id=req.params.id
        let flightdata= await flightmodel.find({_id:id})
        if(flightdata)
        {
            await flightmodel.findByIdAndUpdate({_id:id},body)
            res.status(204).send(`flight details updated successfully`)
        }else{
            res.send(`flight details not found`)
        }
        
      
    } catch (error) {
        res.send(error.message)
    }
})

// ==========================================> flight details deleted by id

flightrouter.delete("/flights/:id",async(req,res)=>{
    try {
        let id=req.params.id
        let flightdata= await flightmodel.find({_id:id})
        if(flightdata)
        {
            await flightmodel.findByIdAndDelete({_id:id}) 
            res.status(202).send(`flight details deleted succesfully`)
        }else{
            res.send("flight details not found")
        }
       
    } catch (error) {
        res.send(error.message)
    }
})

//====================================================> booking route

flightrouter.post("/booking",async(req,res)=>{
    try {
        const {userid,flightid}=req.body;
        if(userid!==""&&flightid!=="")
        {
            let data= new Bookingmodel(req.body)
            await data.save();
            res.status(201).send("Booked successfully") 
        }else{
            res.status(201).send("please all details") 
        }
       
    } catch (error) {
        res.send(error.message)
    }
})

// ========================================================>get booking details


flightrouter.get("/dashboard",async(req,res)=>{
    try {
      let data=await Bookingmodel.find({})
            res.status(201).send(`${data}`) 
        
           
       
    } catch (error) {
        res.send(error.message)
    }
})
module.exports={flightrouter}
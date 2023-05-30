const express=require("express");
const userrouter=express.Router();
const {Usermodel}=require("../model/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

// ========================================> user register route


userrouter.post("/register",async(req,res)=>{
    const {name,Email,password}=req.body
    try {
        bcrypt.hash(password, 3, async function(err, hash) {
            if(!err)
            {
              let userdata= new Usermodel({name,Email,password:hash})
              await userdata.save();
              res.status(201).send("Registered successfully")
            }else{
                res.send("something went wrong while register")
            }
        }); 
    } catch (error) {
        res.send(error.message)
    }
})


// ===============================================> user login route


userrouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
     
         const user=await Usermodel.findOne({email})
         if(user){
         bcrypt.compare(password, user.password, function(err, result) {
         if(result){
         const token = jwt.sign({userID:user._id},process.env.token);
        
         console.log(token)
         res.status(201).send({"msg":"Login Successfull","token":token})
         } else {res.send("Wrong Credntials")}
         });
         } else {
         res.send("Wrong Credntials")
         }
         }
     catch (error) {
     res.send(`Something went wrong \n ${error.message}`)
 
 
    }
})



module.exports={userrouter}
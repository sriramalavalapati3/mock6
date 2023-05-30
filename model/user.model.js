const mongoose=require("mongoose");

// ===============================================>  userSchema
const userSchema=mongoose.Schema({
    "name":String,
    "Email":String,
    "password":String,
   
})
const Usermodel=mongoose.model("userdata",userSchema);


// ===============================================>  BookingSchema

const BookingSchema=mongoose.Schema({
    "userid":{type:String,required:true},
    "flightid":{type:String,required:true},
   
})
const Bookingmodel=mongoose.model("Bookingdata",BookingSchema);


module.exports={Usermodel,Bookingmodel}
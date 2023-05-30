const mongoose=require("mongoose");
const flightSchema=mongoose.Schema({
    "airline": String,
    "flightNo": String,
    "departure": String,
    "arrival": String,
    "departureTime": Date,
    "arrivalTime": Date,
    "seats": Number,
    "price": Number
  
})
const flightmodel=mongoose.model("flightdata",flightSchema);
module.exports={flightmodel}
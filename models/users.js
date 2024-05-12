var mongoose=require('mongoose')
// const url = "mongodb+srv://talk2devendrasolanki:JfVPHJkw75kvbY7u@cluster0.33jhnfk.mongodb.net/?retryWrites=true&w=majority";
const url = "mongodb+srv://talk2devendrasolanki:JfVPHJkw75kvbY7u@cluster0.33jhnfk.mongodb.net/r2agency?retryWrites=true&w=majority";

mongoose.connect(url)

var emailcollectM=mongoose.Schema({
    email:String
})
var contactInfoM=mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    message:String
})


var emailcollect=mongoose.model("email",emailcollectM)
var contactInfo=mongoose.model("contactInfo",contactInfoM)

module.exports={
    emailSchema:emailcollect,
    contactInfo:contactInfo
}
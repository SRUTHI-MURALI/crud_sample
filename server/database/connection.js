const mongoose=require("mongoose")
const connectDB=mongoose()

mongoose.connect('mongodb://127.0.0.1:27017/crudfile')

module.exports= connectDB

const mongoose=require('mongoose');
const mongourl=process.env.MONGO_URL;

const connectdb=async()=>{
    try{
        // console.log("Connecting to Database!")
        // console.log();
        await mongoose.connect(mongourl);
        console.log("Connected to Database!")
    }
    catch(e){
        console.log(e.message);
    }

}

module.exports=connectdb;
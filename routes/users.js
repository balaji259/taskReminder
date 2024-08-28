const express=require("express");
const router=express.Router();
const User=require("../models/users")

router.get("/:id",async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        return res.json(user); 
    }
    catch(e){
        return res.status(400).json({message:e.message});
    }
})
module.exports=router;



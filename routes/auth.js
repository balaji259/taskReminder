const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/users'); // Adjust the path as per your project structure

router.post("/register",async(req,res)=>{
    try{
        const {username,email,password}=req.body;
        const user=await User.findOne({email});
        if(user){
            res.json("User already existes");
        }
        await User.create({username,email,password});
        res.json("User registration successful !");
    }
    catch(e)
    {
        console.log(e.message);
    }

})



router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email not registered!" });
        }

        // Simple password check; you should use bcrypt for hashing passwords
        if (password !== user.password) {
            return res.status(400).json({ message: "Invalid password!" });
        }

        // Create JWT token with userId
        const token = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '1h' });

        // Respond with the token
        res.json({ token, message: 'Login successful', userId: user._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;




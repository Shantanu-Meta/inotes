const express = require('express');
const router = express.Router(); 
const User = require('../models/User');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser')
const { body, validationResult } = require('express-validator');
const user = require('../models/User');
const SECRET_SIGNATURE = 'ABCII78$%'
// Create a POST reqest to the serevr to store to DB. (No auth is required) to api/auth/newuser
router.post('/newuser', [body('name', "Invalid name").isLength({ min: 3}), body('email', "Must contain @").isEmail(), body('password', "Pass len should be 6").isLength({ min: 5 })], async (req, res)=>{
    //  this method validates the user based on the above mentioned array and the req.body
    const result = validationResult(req);

    if (!(result.isEmpty())) {
        res.send({ errors: result.array() });
        return; 
    }

    try{
        const saltRounds = 10;
        const password = req.body.password
        // this will do saltgeneration + hashing of password.
        const secPass = bcrypt.hashSync(password, saltRounds);
        
        let newUser = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secPass
        })

        const data = {
            "user":{
                id: newUser.id
            }
        }
        var authtoken = jwt.sign(data, SECRET_SIGNATURE);
        res.send({authtoken});
    }catch(err){
        res.status(500).send("Some internal error occured" + err)
    }

})

router.post('/login', [body('email', "Not a valid email").isEmail(), body('password', "password must be minimum 5 chars.").isLength({ min: 5 })] ,async (req, res)=>{

    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.send({ errors: result.array()});
    }

    const {email, password} = req.body; 
    try{
        const user = await User.findOne({email}); 
        if(!user){
            return res.status(404).json({error:"user not found"});
        }
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(400).json({error: "user not found"});
        }
        const data = {
            user:{
                id: user.id
            }
        }
        var authtoken = jwt.sign(data, SECRET_SIGNATURE);
        res.send({authtoken});
    }catch(e){
        return res.status(500).json({error: "Server Error"});
    }
})


router.post('/getuser', fetchUser, async (req, res)=>{
    try{
        let userId = req.user.id; 
        const data = await User.findById(userId).select("-password"); 
        res.send(data); 
    }catch(e){
        return res.status(500).json({error: " Server Error"});
    }

})


module.exports = router
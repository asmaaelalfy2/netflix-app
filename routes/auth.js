const router=require('express').Router()

const User=require('../models/User')
const CryptoJS = require("crypto-js");
const jwt=require('jsonwebtoken')

//register
router.post("/register",async(req,res)=>{
    const newUser=new User({
        username:req.body.username,
        email:req.body.email,

        password:CryptoJS.AES.encrypt(JSON.stringify(req.body.password), process.env.SECRET_KEY).toString()

    })
    try {
        const user=await newUser.save()
        res.json(user) 
    } catch (error) {
        console.log(error)
    }
 
})

//login
router.post('/login',async(req,res)=>{
try {
    const user=await User.findOne({email:req.body.email})

    !user&&res.status(401).json({message:"email or password is false"})
    const bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); 

decryptedData!==req.body.password&&res.status(401).json({message:"email or password is false"})
  

const accessToken=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.SECRET_KEY,{expiresIn:'5d'})
const{password,...info}=user._doc
res.status(200).json({...info,accessToken}) 
} catch (error) {
    
}
  console.log(error)
})

module.exports=router
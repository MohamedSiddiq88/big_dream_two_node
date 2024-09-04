import express from "express"
import { addRandomString, addUsers, deleteRandomString, generateJwtToken, getRandom, getUser, updatePassword } from "../Controllers/users.js";
import bcrypt from "bcrypt"
import crypto from "crypto"

const router=express.Router();

router.post("/signup",async(req,res)=>{
    try {
        //genarate slat
        const salt= await bcrypt.genSalt(10)

        const user=await getUser(req.body.phoneNumber);
        if(!user){
            const hashedPassword=await bcrypt.hash(req.body.password, salt)
            const hashedUser=await {...req.body,password: hashedPassword}
            const result= await addUsers(hashedUser);
            return res.status(200).json({result:result,data:"Added"})
        }
        res.status(400).json({data:"Given phoneNumber already exist"}) 
    } catch (error) {
        res.status(500).json("internal server error");
    }
})

router.post("/login",async(req,res)=>{
    try {
        //is user available 
        const user =await getUser(req.body.phoneNumber)
        if(!user){
        return res.status(400).json({data:"invalid"})
        }
        //is password valid
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if(!validPassword){
            return res.status(400).json({data:"invalid"})
        }
        const token =generateJwtToken(user._id)
        res.status(200).json({data:token,name:user.name,phoneNumber:user.phoneNumber,userId:user._id})


    } catch (error) {
        res.status(500).json("internal server error");   
    }
})








  



export const usersRouter = router;

import { client } from "../db.js";
import  jwt  from "jsonwebtoken";

export function  addUsers(userInfo){
    return client
    .db("dream-big")
    .collection("users")
    .insertOne(userInfo)
}

export function  getUser(userphoneNumber){
    return client
    .db("dream-big")
    .collection("users")
    .findOne({phoneNumber:userphoneNumber})
}

export function  generateJwtToken(id){
    return jwt.sign({id}, process.env.SECRETKEY, {expiresIn:"30d"})   
}

export function addRandomString(randomString,phoneNumber){
    
    const existMail = client
    .db("dream-big")
    .collection("randomstring")
    .findOne({phoneNumber:phoneNumber})

    if(existMail){
        return client
        .db("dream-big")
        .collection("randomstring")
        .findOneAndUpdate({phoneNumber:phoneNumber},{$set:{randomString:randomString}})   
    }else{
        return client
        .db("dream-big")
        .collection("randomstring")
        .insertOne({
            randomString: randomString,
            phoneNumber:phoneNumber
          })
    }

    
}

export function  getRandom(randomString){
    return client
    .db("dream-big")
    .collection("randomstring")
    .findOne({randomString: randomString})
}

export function deleteRandomString(randomString){
     client
        .db("dream-big")
        .collection("randomstring")
        .deleteOne({ randomString: randomString });
}

export function updatePassword(phoneNumber,password){
    return client
        .db("dream-big")
        .collection("users")
        .updateOne({ phoneNumber: phoneNumber }, { $set: { password: password } });
}
import express from "express";
import dotenv from "dotenv"
import { usersRouter } from "./Routers/users.js";
import cors from "cors";

//configure the envirenment.
dotenv.config()

//initialize express server framework
const PORT=process.env.PORT;
const app=express();

//middleware
const corsOptions = {
  origin: 'http://localhost:3000/', // Replace with your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions)); // Restrict CORS in production
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welocome to project1")
})
app.use("/users",usersRouter)   



//listen to a server
app.listen(PORT,()=>console.log( `server started in localhost:9090`));
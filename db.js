import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// configure the environment.
dotenv.config();

const MongoURL = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2"; // Update the URL for the local MongoDB

async function createConnection() {
    const client = new MongoClient(MongoURL);
    await client.connect();
    console.log("Connected successfully to local MongoDB");
    return client;
}

export const client = await createConnection();
export var ObjectId = MongoClient.ObjectId; // You can also use `MongoClient.ObjectId`

import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// configure the environment.
dotenv.config();

const MongoURL = "mongodb://localhost:27017"; // Update the URL for the local MongoDB

async function createConnection() {
    const client = new MongoClient(MongoURL);
    await client.connect();
    console.log("Connected successfully to local MongoDB");
    return client;
}

export const client = await createConnection();
export var ObjectId = MongoClient.ObjectId; // You can also use `MongoClient.ObjectId`

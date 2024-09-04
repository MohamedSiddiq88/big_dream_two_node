// Controllers/gameResults.js

import { client } from "../db.js";

// Function to add a game result
export function addGameResult(gameResult) {
    return client
        .db("dream-big")
        .collection("gameResult")
        .insertOne(gameResult);
}

// Function to get a game result by its ID
export function getGameResultById(resultId) {
    return client
        .db("dream-big")
        .collection("gameResult")
        .findOne({ _id: resultId });
}

// Function to get all game results
export function getAllGameResults() {
    return client
        .db("dream-big")
        .collection("gameResult")
        .find({})
        .toArray();
}

// Function to update a game result by its ID
export function updateGameResult(resultId, updatedResult) {
    return client
        .db("dream-big")
        .collection("gameResult")
        .updateOne({ _id: resultId }, { $set: updatedResult });
}

// Function to delete a game result by its ID
export function deleteGameResult(resultId) {
    return client
        .db("dream-big")
        .collection("gameResult")
        .deleteOne({ _id: resultId });
}


export function getPaginatedGameResults(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return client
        .db("dream-big")
        .collection("gameResult")
        .find({})
        .skip(skip)  // Skip the previous pages' results
        .limit(limit) // Limit the number of results
        .toArray();
}

export function getLastFiveResults(gameName) {
    return client
        .db("dream-big")
        .collection("gameResult")
        .find({gameName})
        .sort({ _id: -1 })  // Sort by _id in descending order to get the latest entries first
        .limit(5)  // Limit the result to 5 entries
        .toArray();
}
// Routes/gameResults.js

import express from "express";
import {
    addGameResult,
    getGameResultById,
    getAllGameResults,
    updateGameResult,
    deleteGameResult,
    getPaginatedGameResults,
    getLastFiveResults
} from "../Controllers/gameResults.js";

const router = express.Router();

// Route to add a new game result
router.post("/add", async (req, res) => {
    try {
        const result = await addGameResult(req.body);
        res.status(200).json({ result: result, message: "Game result added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to get a game result by ID
router.get("/:id", async (req, res) => {
    try {
        const result = await getGameResultById(req.params.id);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "Game result not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to get all game results
router.get("/", async (req, res) => {
    try {
        const results = await getAllGameResults();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to update a game result by ID
router.put("/:id", async (req, res) => {
    try {
        const updatedResult = req.body;
        const result = await updateGameResult(req.params.id, updatedResult);
        if (result.modifiedCount > 0) {
            res.status(200).json({ message: "Game result updated successfully" });
        } else {
            res.status(404).json({ message: "Game result not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to delete a game result by ID
router.delete("/:id", async (req, res) => {
    try {
        const result = await deleteGameResult(req.params.id);
        if (result.deletedCount > 0) {
            res.status(200).json({ message: "Game result deleted successfully" });
        } else {
            res.status(404).json({ message: "Game result not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
        const results = await getPaginatedGameResults(page, limit);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/last-five", async (req, res) => {
    try {
        const gameName = req.query.gameName; // Get the game name from the query params
        const lastFiveResults = await getLastFiveResults(gameName);
        res.status(200).json(lastFiveResults);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

export const gameResultsRouter = router;

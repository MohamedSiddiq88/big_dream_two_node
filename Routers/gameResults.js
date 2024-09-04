// Routes/gameResults.js

import express from "express";
import {
    addGameResult,
    getGameResultById,
    getAllGameResults,
    updateGameResult,
    deleteGameResult
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

export const gameResultsRouter = router;

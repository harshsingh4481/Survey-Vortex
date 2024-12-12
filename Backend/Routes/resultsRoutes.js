const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const db = mongoose.connection;
require ('dotenv').config();
const {  result } = require("../model/User_");
// ..................................storing results
router.put("/", async (req, res) => {
    const { polling, maxCount, winner } = req.body;
  
    try {
      const updatedPolling = await result.findOneAndUpdate(
        {},
        { polling: polling, maxCount: maxCount, winner: winner },
        { new: true, upsert: true } // Create if not exist
      );
  
      res
        .status(200)
        .json({ message: "Polling status updated", data: updatedPolling });
    } catch (error) {
      res.status(500).json({ message: "Error updating polling status", error });
    }
  });
  
  //    ...........................    getting results  .......
  router.get("/", async (req, res) => {
    try {
      const pollingData = await db.collection("testpollings").findOne({});
     
      if (!pollingData) {
        return res.status(404).json({ message: "Polling data not found" });
      }
      
      res.json(pollingData);
      
    } catch (error) {
      console.error("Error retrieving polling data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


module.exports = router;
const express = require("express");
const { JobModel } = require("../model/Job.Model");
const chartRouter = express.Router();

chartRouter.get('/chartdata', async (req, res) => {
    try {
        const jobs = await JobModel.find();
        const countReceived = [];
        const countApplied = [];
    
        jobs.forEach(job => {
          // Assuming your JobModel has properties applied and jobView
          countApplied.push(job.applied || 0); // If applied is undefined, default to 0
          countReceived.push(job.jobViews || 0); // If jobView is undefined, default to 0
        });
    
        res.json({ countReceived, countApplied });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  });
  

  module.exports = {
    chartRouter
  };
  
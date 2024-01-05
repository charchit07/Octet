const express = require("express");
const { JobModel } = require("../model/Job.Model");

const jobRouter = express.Router();

jobRouter.get("/job", async (req, res) => {
  const ID = req.query.id;
  try {
    if (ID) {
      let data = await JobModel.find({ _id: ID });
      res.send(data);
    } else {
      const allJobs = await JobModel.find();
      res.status(200).send(allJobs);
    }
  } catch (error) {
    res.status(401).send({ msg: error.message });
  }
});

jobRouter.post("/job", async (req, res) => {
    try {
      const payload = req.body;
      const job = new JobModel({
        ...payload,
        posted: new Date(),
        dateFormat: new Date(),
      });
      await job.save();
      res.send({ id: job._id, msg: "Job Created" });
    } catch (error) {
      res.status(500).send({ msg: "Job Has Not Been Created" });
    }
  });
  
module.exports = {
  jobRouter,
};

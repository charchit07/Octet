const express = require("express");
const { CountModel } = require("../model/Count.Model");
const { JobModel } = require("../model/Job.Model");

const countRouter = express.Router();

countRouter.get("/count", async (req, res) => {
  const ID = req.query.id;
  try {
    if (ID) {
      let data = await CountModel.find({ _id: ID });
      res.send(data);
    } else {
      const allCount = await CountModel.find();
      const allJobs = await JobModel.find();
      allCount[0].active_job = allJobs.length;
      console.log( allCount)
      res.status(200).send(allCount);
    }
  } catch (error) {
    res.status(401).send({ msg: error.message });
  }
});

countRouter.post("/count", async (req, res) => {
    const payload = req.body;
    const note = new CountModel(payload);
    await note.save();
    res.send({ msg: "Count Created" });
  });
  
  
module.exports = {
  countRouter,
};

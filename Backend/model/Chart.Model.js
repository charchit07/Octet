const mongoose = require("mongoose");

// Create a schema for your data model
const chartSchema = new mongoose.Schema(
  {
    countReceived: [Number],
    countApplied: [Number],
  },
  {
    versionKey: false,
  }
);

// Create a model based on the schema
const ChartModel = mongoose.model("Chart", chartSchema);

module.exports = {
  ChartModel,
};

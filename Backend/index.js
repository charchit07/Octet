const express = require("express");
const cors = require("cors")
const { connection } = require("./config/db");
const { jobRouter } = require("./router/Job.Router");
const { countRouter } = require("./router/Count.Router");
const { chartRouter } = require("./router/Chart.Router");

const app = express();

app.use(express.json());

app.use(cors())

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/", jobRouter)
app.use("/",countRouter)
app.use("/",chartRouter)

app.listen(7500, async () => {
  try {
    await connection, console.log("Connect To DB");
  } catch (error) {
    console.log("Cannot Connect To DB");
    console.log(error);
  }
  console.log("Runing server in port 7500");
});

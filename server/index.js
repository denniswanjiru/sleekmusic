const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send({ name: "Sleek", description: "Music reimagined" });
});

app.listen(8080, () => {
  console.log("App running on port 8080");
});

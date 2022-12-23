const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Welcome to my blog. Learn about my past experiences.</h1>");
});

app.listen(8080, () => {
  console.log("App running on port 8080");
});

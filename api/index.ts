import express, { Request, Response } from "express";
import cors from "cors";
import { v4 } from "uuid";
import models from "./database";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// const id = v4();

// const user = {
//   id,
//   username: "creez",
//   email: "dennis@sleek.com",
//   gender: "male",
//   dob: new Date(),
//   password: "password",
//   name: "Dennis Wanjiru",
// };

app.post("/api/users", (req, res) => {
  console.log({ bdy: req.body });
  var user = new models.User({
    username: req.body.username,
    password: req.body.password,
  });

  user.save((err: any, data: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

app.get("/api/users", (req, res) => {
  models.User.find((err: any, data: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

app.listen(8080, () => {
  console.log("App running on port 8080");
});

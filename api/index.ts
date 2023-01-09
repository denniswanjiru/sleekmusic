import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send({ name: "Sleek", description: "Music reimagined!!!" });
});

app.listen(8080, () => {
  console.log("App running on port 8080");
});

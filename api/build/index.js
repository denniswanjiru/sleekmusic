"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
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
    var user = new database_1.default.User({
        username: req.body.username,
        password: req.body.password,
    });
    user.save((err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    });
});
app.get("/api/users", (req, res) => {
    database_1.default.User.find((err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    });
});
app.listen(8080, () => {
    console.log("App running on port 8080");
});

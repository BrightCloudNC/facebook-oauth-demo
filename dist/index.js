"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authFacebook_1 = __importDefault(require("./routes/authFacebook"));
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    return res.status(200).send("Hello world").end();
});
app.get("/login", (req, res) => {
    return res.status(200).send("login route").end();
});
app.use("/api", authFacebook_1.default);
app.listen(5555, () => {
    console.log("server running...");
});

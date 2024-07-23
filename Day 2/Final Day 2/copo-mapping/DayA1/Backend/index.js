import express from "express";
const app = express()
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

import registerRoute from "./routes/register.js"
import loginRoute from "./routes/login.js"
const port = 8081;

app.use(cors())
app.use(express.json());
app.use(bodyParser.json());

app.use(cookieParser())
app.use("/api/register",registerRoute)
app.use("/api/login",loginRoute)
app.listen(port, () => {
    console.log("Server is Running on PORT :", port);
  });


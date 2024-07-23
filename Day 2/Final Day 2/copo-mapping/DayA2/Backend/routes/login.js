import express, { Router } from "express";
const app =express()
import { login } from "../controller/login.js"




const router =express.Router();

router.post("/",login);


export default router;
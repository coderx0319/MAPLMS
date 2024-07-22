import express, { Router } from "express";
const router =express.Router();
import { register } from "../controller/register.js"

router.post("/",register);

export default router;
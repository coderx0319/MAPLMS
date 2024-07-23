import express, { Router } from "express";
const router =express.Router();
import { deleteUser, getemail, getusers, register, setusertype } from "../controller/register.js"

router.post("/",register);
router.post('/getemail/:id',getemail);
router.post('/getusers',getusers);
router.post('/updateusertype',setusertype);
router.delete('/deleteuser/:userid',deleteUser);
export default router;
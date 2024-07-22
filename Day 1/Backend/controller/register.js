import dotenv from "dotenv";
dotenv.config();
import asyncHand from "express-async-handler";
import bcrypt from "bcrypt";
import { connection as db } from "../config/dbConfig.js";

export const register = asyncHand(async (req, res) => {

    const email = req.body.email;
    const pass = req.body.password;
    const currentDate = new Date();

console.log(email,pass)
    const q = "SELECT * FROM users where emailid = (?)";
    db.query(q, [email], (err, data) => {
      if (err) return res.json(err);
      if (data.length) return res.status(409).json("user allready exist!");
  
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(pass, salt);
  
      const q = "INSERT INTO users (`emailid`,`password`, `created_time`) VALUES (?,?,?)";
      const values = [email, hash, currentDate];
      db.query(q, values, (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json("User has been created.");
      });
    });
  });
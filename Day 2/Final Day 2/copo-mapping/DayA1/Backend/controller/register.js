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


  export const getemail = (req, res) => {
    const { id } = req.params;
    const query = `SELECT userid, emailid from users where userid = ?`;
    db.query(query, id, (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json(results);
    });
  };
  
  export const getusers = (req, res) => {
    const query = `SELECT userid,emailid,isuser from users`;
    db.query(query, (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.json(results);
    });
  };



  // Assuming you have a database connection `db` set up somewhere

export const setusertype = (req, res) => {
  // Extracting parameters from the request body
  const { userid, newType } = req.body;

  // Check if userid and newType are provided
  if (!userid || !newType) {
    return res.status(400).json({ error: 'Missing userid or newType' });
  }

  // Prepare the SQL query
  const query = 'UPDATE users SET isuser = ? WHERE userid = ?';

  // Execute the query
  db.query(query, [newType, userid], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({ message: 'User type updated successfully' });
  });
};


export const deleteUser = (req, res) => {
  // Extracting userid from URL parameters
  const { userid } = req.params;
  console.log(userid);

  // Check if userid is provided
  if (!userid) {
    return res.status(400).json({ error: 'Missing userid' });
  }

  // Prepare the SQL query
  const query = 'DELETE FROM users WHERE userid = ?';

  // Execute the query
  db.query(query, [userid], (error, results) => {
    if (error) {
      console.error('SQL Error:', error.message);
      return res.status(500).json({ error: 'Failed to delete user' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  });
};

const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());



//получение списка всех пользователей

app.get("/users", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (error) {
    console.error(error.message);
  }
});
//добавление нового пользователя

app.post("/users", async (req, res) => {
  try {
    const description = req.body;
    const userid = description["userid"];
    const dateregistration = description["dateregistration"];
    const datelastActivity = description["datelastActivity"];
    const newUser = await pool.query(
      "INSERT INTO users (userid, dateregistration, datelastactivity) VALUES($1,$2,$3) RETURNING *",
      [userid, dateregistration, datelastactivity]
    );
    res.json(newUser.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});


//удаление пользователя

app.delete("/users/:userid", async (res, req) => {
  try {
    const {userid} = req.params;
    const deleteUser = await pool.query("DELETE FROM users WHERE userid = $1", [
      userid,
    ]);
    res.json("user was deleted");
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(5000, () => {
  console.log("Na portu 5000 vse horosho");
});

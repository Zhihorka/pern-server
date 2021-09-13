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
    const datelastactivity = description["datelastactivity"];
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




app.delete("/users/:userid", async (req, res) => {
  try {
    const { userid } = req.params;
    const deleteTodo = await pool.query("DELETE FROM users WHERE userid = $1", [
      userid
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => {
  console.log("Na portu 5000 vse horosho");
});

import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import env from "dotenv";

const app = express();
const port = 3000;
env.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/home", (req, res) => {
  res.render("index.ejs");
});
app.get("/about", (req, res) => {
  res.render("about.ejs");
});
app.get("/course", (req, res) => {
  res.render("course.ejs");
});
app.get("/blog", (req, res) => {
  res.render("blog.ejs");
});
app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});
app.get("/", (req, res) => {
  res.render("login.ejs");
});
app.get("/register", (req, res) => {
  res.render("register.ejs");
});
app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  try {
    const checkResult = await db.query(
      "SELECT * FROM student WHERE email = $1",
      [email]
    );
    if (checkResult.rows.length > 0) {
      res.render("login.ejs");
    } else {
      const result = await db.query(
        "INSERT INTO student(email,password) VALUES($1,$2)",
        [email, password]
      );
      res.render("login.ejs");
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/", async (req, res) => {
  try {
    const email = req.body.username;
    const password = req.body.password;
    const result = await db.query("SELECT * FROM student WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPassword = password;
      if (storedPassword === password) {
        res.redirect("/home");
      } else {
        res.send("Incorrect Password!");
      }
    } else {
      res.render("register.ejs");
    }
  } catch (err) {
    console.log(err);
  }
});
app.listen(port, () => {
  console.log(`server is running of port ${port}`);
});

import express from "express";
const app = express();
app.use(express.static("public"));
app.get("/", (req, res) => {
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
app.listen(3000);

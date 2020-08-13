const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const { render } = require("ejs")
const blogRoutes = require("./routes/blogRoutes")

//express app
const app = express()

//connect to mongoDB
const dbURI =
  "mongodb+srv://techmoby43:baiash143@ninjatuts.8v22l.mongodb.net/node-tuts?retryWrites=true&w=majority"
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err))

// Register view engine
app.set("view engine", "ejs")

// middleware & static files
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))

app.get("/", (req, res) => {
  res.redirect("/blogs")
})

app.get("/about", (req, res) => {
  res.render("about", { title: "About" })
})

// blog routes
app.use("/blogs", blogRoutes)

app.use((req, res) => {
  res.status(404).render("404", { title: "404" })
})

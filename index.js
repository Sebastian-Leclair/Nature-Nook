const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/nature-nook");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "CONNECTION ERROR:"));
db.once("open", () => {
    console.log("DATABASE CONNECTED");
});

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/campgrounds", async (req, res) => {
    const allCampgrounds = await Campground.find({});
    res.render("campgrounds/index", {allCampgrounds});
});

app.get("/campgrounds/:id", async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/show", {campground});
});

app.listen(3000, () => {
    console.log("SERVING ON PORT 3000")
});
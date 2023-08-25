const mongoose = require("mongoose");
const cities = require("./cities");
const {places, descriptors} = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/nature-nook");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "CONNECTION ERROR:"));
db.once("open", () => {
    console.log("DATABASE CONNECTED");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDatabase = async () => {
    await Campground.deleteMany({});
    for (let i =0; i < 50; i++) {
        const randomNum = Math.floor(Math.random() * 1000) + 1;
        const campground = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[randomNum].city}, ${cities[randomNum].state}`
        });
        await campground.save();
    };
};

seedDatabase().then(() => {
    mongoose.connection.close();
});
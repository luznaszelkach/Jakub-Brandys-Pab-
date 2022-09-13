import express from "express";
import mongoose from "mongoose";
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

//IMPORT ROUTES

const restaurantRoute = require("./routes/Restauracje");
app.use("/restaurant", restaurantRoute);

const tableRoute = require("./routes/Stoliki");
app.use("/tables", tableRoute);

const employeeRoute = require("./routes/Pracownicy");
app.use("/employees", employeeRoute);

const bookingRoute = require("./routes/Rezerwacje");
app.use("/bookings", bookingRoute);

const productRoute = require("./routes/Produkty");
app.use("/products", productRoute);

const dishRoute = require("./routes/Dania");
app.use("/dishes", dishRoute);

const orderRoute = require("./routes/Zamowienia");
app.use("/orders", orderRoute);

//DATABASE CONNECTION


const connString = 'mongodb+srv://JakubJakub:JakubJakub@cluster0.lpyl8r2.mongodb.net/?retryWrites=true&w=majority';

export async function dbmain() {
    console.log("Connecting to mongo");
    const db = await mongoose.connect(connString);
    console.log("Mongo Connected!");
}

dbmain();

app.listen(3009, () => console.log("Server started"));
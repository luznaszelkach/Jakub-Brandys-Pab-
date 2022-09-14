import express from "express";
import mongoose from "mongoose";
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());


const restauracjaRoute = require("./routes/Restauracje");
app.use("/restauracje", restauracjaRoute);

const stolikRoute = require("./routes/Stoliki");
app.use("/stoliki", stolikRoute);

const pracownikRoute = require("./routes/Pracownicy");
app.use("/pracownicy", pracownikRoute);

const rezerwacjaRoute = require("./routes/Rezerwacje");
app.use("/rezerwacje", rezerwacjaRoute);

const produktRoute = require("./routes/Produkty");
app.use("/produkty", produktRoute);

const danieRoute = require("./routes/Dania");
app.use("/dania", danieRoute);

const zamowienieRoute = require("./routes/Zamowienia");
app.use("/zamowienia", zamowienieRoute);



const connString = 'mongodb+srv://JakubJakub:JakubJakub@cluster0.lpyl8r2.mongodb.net/?retryWrites=true&w=majority';

export async function dbmain() {
    console.log("Connecting to mongo");
    const db = await mongoose.connect(connString);
    console.log("Mongo Connected!");
}

dbmain();

app.listen(3009, () => console.log("Server started"));
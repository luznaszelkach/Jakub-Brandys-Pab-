import mongoose from "mongoose";

const pracownikSchema = new mongoose.Schema({
    imie: String,
    nazwisko: String,
    stanowisko: {
        type: String,
        enum: ["barman", "kelner", "kucharz"],
        required: true
    }
});


const Pracownik = mongoose.model('Pracownik', pracownikSchema)
module.exports = Pracownik
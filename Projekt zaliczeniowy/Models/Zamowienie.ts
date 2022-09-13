import mongoose from "mongoose";

const zamowienieSchema = new mongoose.Schema({
    pracownik: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pracownik",
    },
    pozycje: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Danie"
    }],
    statusZamowienia: {
        type: String,
        enum: ["Zlozone", "W realizacji", "Zrealizowane", "Rachunek"],
        required: true
    },
    stolik: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stolik",
        required: true,
    },
    kwota: Number,
});

module.exports = mongoose.model('Zamowienie', zamowienieSchema)
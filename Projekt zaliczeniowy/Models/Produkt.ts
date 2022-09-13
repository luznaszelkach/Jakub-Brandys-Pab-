import mongoose from "mongoose";

const jednostkaMiary = {
    g: 1,
    kg: 2,
    ml: 3,
    l: 4,
    szt: 5
};

Object.freeze(jednostkaMiary);

const produktSchema = new mongoose.Schema({
    nazwa: {
        type: String,
        required: true,
    },
    cena: Number,
    ilosc: Number,
    jednostkaMiary: {
        type: String,
        enum: ['g', 'kg', 'ml', 'l', 'szt'],
        default: "g",
    },
});

module.exports = mongoose.model('Produkt', produktSchema)
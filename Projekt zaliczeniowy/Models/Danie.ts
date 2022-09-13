import mongoose from "mongoose";

const danieSchema = new mongoose.Schema({
    nazwa: {
        type: String,
        required: true,
    },
    cena: Number,
    kategoria: {
        type: String,
        enum: ["makaron", "ryba", "zupa", "deser", "napoj", "pierogi"]
    }
});

const Danie = mongoose.model('Danie', danieSchema)
module.exports = Danie
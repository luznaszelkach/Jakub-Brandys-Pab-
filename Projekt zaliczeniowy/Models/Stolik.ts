import mongoose from "mongoose";

const stolikSchema = new mongoose.Schema({
    nazwa: {
        type: String,
        required: true,
    },
    iloscOsob: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['wolny', 'niedostepny', 'zarezerwowany'],
        default: 'wolny'
    },
});

const Stolik = mongoose.model('Stolik', stolikSchema)
module.exports = Stolik
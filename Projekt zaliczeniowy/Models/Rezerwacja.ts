import mongoose from "mongoose";


const rezerwacjaSchema = new mongoose.Schema({
    stolik: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stolik',
    },
    start: {
        type: Date,
        default: Date.now(),
    },
    koniec: Date,
    klient: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Rezerwacja', rezerwacjaSchema)
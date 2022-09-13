import mongoose from "mongoose";
const restauracjaSchema = new mongoose.Schema({
    nazwa: String,
    adres: String,
    telefon: String,
    NIP: {
        type: String,
        required: true,
    },
    email: String,
    www: String,
});

module.exports = mongoose.model('Restauracja', restauracjaSchema)
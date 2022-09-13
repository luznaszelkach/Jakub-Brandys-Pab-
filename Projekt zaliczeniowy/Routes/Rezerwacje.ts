import express from "express";
import mongoose from "mongoose";

const router = express.Router();

const Rezerwacja = require("../models/Rezerwacja");
const Stolik = require("../models/Stolik");


//Wyswietlenie listy wszystkich rezerwacji

router.get("/", async (req: any, res: any) => {
    try {
        const rezerwacje = await Rezerwacja.find().populate("stolik");
        res.json(rezerwacje);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

//Wyswietlenie konkretnej rezerwacji

router.get("/:id", async (req: any, res: any) => {
    try {
        const rezerwacje = await Rezerwacja.findById(req.params.id);

        if (!rezerwacje) throw Error("Nie znaleziono rezerwacji!");
        res.status(200).json(rezerwacje);

        console.log(`Rezerwacja id:${req.params.id} zostala zwrocona do bazy danych!`);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

//Dodanie rezerwacji do bazy danych

router.post("/", async (req: any, res: any) => {
    const newRezerwacja = new Rezerwacja({
        stolik: new mongoose.Types.ObjectId(req.body.stolik),
        start: req.body.start,
        koniec: req.body.koniec,
        klient: req.body.klient
    });
    const saveRezerwacja = await newRezerwacja.save();

    try {
        res.status(200).json(saveRezerwacja);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

//Wyszukiwanie stolikow wolnych danego dnia

router.post("/free", async (req: any, res: any) => {
    const stolik = await Stolik.find({ status: "wolny", iloscOsob: req.body.iloscOsob });
    const rezerwacja = await Rezerwacja.find({ start: req.body.start, _id: stolik._id });
    if (rezerwacja.length == 0)
        res.json(stolik)
    else
        res.send('Jest wolny stolik!')
});

//Usuwanie rezerwacji po ID

router.delete("/:id", async (req: any, res: any) => {
    try {
        const rezerwacje = await Rezerwacja.findByIdAndDelete(req.params.id);

        if (!rezerwacje) throw Error("Nie znaleziono rezerwacji!");
        res.status(200).json({ success: true });

        console.log(`Rezerwacja id:${req.params.id} zostala usunieta z bazy danych!`);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

//Usuwanie wszystkich rezerwacji

router.delete("/", async (req: any, res: any) => {
    try {
        const rezerwacje = await Rezerwacja.remove();

        if (!rezerwacje) throw Error("Nie znaleziono rezerwacji!");
        res.status(200).json({ success: true });

        console.log(`Wszystkie rezerwacje zostaly usuniete z bazy danych!`);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

// Update stolika po ID

router.put("/:id", async (req: any, res: any) => {
    try {
        const rezerwacje = await Rezerwacja.findByIdAndUpdate(req.params.id, req.body);

        if (!rezerwacje) throw Error("Cos poszlo nie tak podczas aktualizacji rezerwacji!");
        res.status(200).json(req.body);

        console.log(`Rezerwacja id:${req.params.id} zaktualizowana!`);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

module.exports = router;
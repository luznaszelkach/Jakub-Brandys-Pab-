const express = require("express");
const router = express.Router();

const Pracownik = require("../models/Pracownik");



router.get("/", async (req: any, res: any) => {
    try {
        const pracownicy = await Pracownik.find();
        res.json(pracownicy);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});



router.get("/:id", async (req: any, res: any) => {
    try {
        const pracownicy = await Pracownik.findById(req.params.id);

        if (!pracownicy) throw Error("Nie znaleziono pracownika!");
        res.status(200).json(pracownicy);

        console.log(`Pracownik id:${req.params.id} zostal zwrocony do bazy danych!`);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});



router.post("/", async (req: any, res: any) => {
    const newPracownik = new Pracownik({
        imie: req.body.imie,
        nazwisko: req.body.nazwisko,
        stanowisko: req.body.stanowisko
    });
    const savePracownik = await newPracownik.save();

    try {
        res.status(200).json(savePracownik);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});



router.delete("/:id", async (req: any, res: any) => {
    try {
        const pracownicy = await Pracownik.findByIdAndDelete(req.params.id);

        if (!pracownicy) throw Error("Nie znaleziono pracownika!");
        res.status(200).json({ success: true });

        console.log(`Pracownik id:${req.params.id} zostal usuniety z bazy danych!`);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});



router.delete("/", async (req: any, res: any) => {
    try {
        const pracownicy = await Pracownik.remove();

        if (!pracownicy) throw Error("Nie znaleziono pracownika!");
        res.status(200).json({ success: true });

        console.log(`Wszyscy pracownicy zostali usunieci z bazy danych!`);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});



router.put("/:id", async (req: any, res: any) => {
    try {
        const pracownicy = await Pracownik.findByIdAndUpdate(
            req.params.id,
            req.body
        );

        if (!pracownicy)
            throw Error("Cos poszlo nie tak podczas aktualizacji pracownika!");
        res.status(200).json(req.body);

        console.log(`Pracownik id:${req.params.id} zaktualizowany!`);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

module.exports = router;
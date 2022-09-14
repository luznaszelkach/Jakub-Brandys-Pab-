import express from "express";
const router = express.Router();

const Danie = require("../models/Danie");


router.get("/", async (req: any, res: any) => {
    try {
        const dania = await Danie.find();
        res.json(dania);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});


router.get("/:id", async (req: any, res: any) => {
    try {
        const dania = await Danie.findById(req.params.id);

        if (!dania) throw Error("Nie znaleziono dania!");
        res.status(200).json(dania);

        console.log(`Danie id:${req.params.id} zostalo zwrocone do bazy danych!`);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});


router.post("/", async (req: any, res: any) => {
    const newDanie = new Danie({
        nazwa: req.body.nazwa,
        cena: req.body.cena,
        kategoria: req.body.kategoria
    });
    const saveDish = await newDanie.save();

    try {
        res.status(200).json(saveDish);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});


router.delete("/:id", async (req: any, res: any) => {
    try {
        const dania = await Danie.findByIdAndDelete(req.params.id);

        if (!dania) throw Error("Nie znaleziono dania!");
        res.status(200).json({ success: true });

        console.log(`Danie id:${req.params.id} zostalo usuniete z bazy danych!`);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});


router.delete("/", async (req: any, res: any) => {
    try {
        const dania = await Danie.remove();

        if (!dania) throw Error("Nie znaleziono dania!");
        res.status(200).json({ success: true });

        console.log(`Wszystkie dania usunieto z bazy danych!`);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});


router.put("/:id", async (req: any, res: any) => {
    try {
        const dania = await Danie.findByIdAndUpdate(
            req.params.id,
            req.body
        );

        if (!dania)
            throw Error("Cos poszlo nie tak podczas aktualizacji dania!");
        res.status(200).json(req.body);

        console.log(`Danie id:${req.params.id} zostalo zaktualizowane!`);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});


module.exports = router;
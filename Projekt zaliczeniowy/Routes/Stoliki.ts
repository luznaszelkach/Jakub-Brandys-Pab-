import express from "express";
const router = express.Router();

const Stolik = require("../models/Stolik");



router.get("/", async (req: any, res: any) => {
    try {
        const stoliki = await Stolik.find();
        res.json(stoliki);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});



router.get("/:id", async (req: any, res: any) => {
    try {
        const stolik = await Stolik.findById(req.params.id);

        if (!stolik) throw Error("Nie znaleziono stolika!");
        res.status(200).json(stolik);

        console.log(`Stolik id:${req.params.id} zostal zwrocony do bazy danych!`);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});



router.post("/", async (req: any, res: any) => {
    const newStolik = new Stolik({
        nazwa: req.body.nazwa,
        iloscOsob: req.body.iloscOsob,
        status: req.body.status,
    });
    const saveStolik = await newStolik.save();

    try {
        res.status(200).json(saveStolik);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});



router.delete("/:id", async (req: any, res: any) => {
    try {
        const stolik = await Stolik.findByIdAndDelete(req.params.id);

        if (!stolik) throw Error("Nie znaleziono stolika!");
        res.status(200).json({ success: true });

        console.log(`Stolik id:${req.params.id} zostal usuniety z bazy danych!`);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});



router.delete("/", async (req: any, res: any) => {
    try {
        const stolik = await Stolik.remove();

        if (!stolik) throw Error("Nie znaleziono stolika!");
        res.status(200).json({ success: true });

        console.log(`Wszystkie stoliki zostaly usuniete z bazy danych!`);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});


router.put("/:id", async (req: any, res: any) => {
    try {
        const stolik = await Stolik.findByIdAndUpdate(
            req.params.id,
            req.body
        );

        if (!stolik)
            throw Error("Cos posz³o  nie tak podczas aktualizacji stolika!");
        res.status(200).json(req.body);

        console.log(`Stolik id:${req.params.id} zostal zaktualizowany!`);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

module.exports = router;
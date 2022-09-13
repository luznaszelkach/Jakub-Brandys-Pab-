import express from "express";
const router = express.Router();

const Restauracja = require("../models/Restauracja");

// Wyœwietlenie restauracji

router.get("/", async (req: any, res: any) => {
    try {
        const restauracje = await Restauracja.find();
        res.json(restauracje);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

//Dodawanie restauracji do bazy danych

router.post("/", async (req: any, res: any) => {
    const restauracja = await Restauracja.find();
    if (restauracja.length != 0) {
        res.send("Restauracja ju¿ istnieje!");
        console.log("Restauracja ju¿ istnieje!");
    }
    else {
        const newRestauracja = new Restauracja({
            nazwa: req.body.nazwa,
            adres: req.body.adres,
            telefon: req.body.telefon,
            NIP: req.body.NIP,
            email: req.body.email,
            www: req.body.www,
        });
        const saveRestauracja = await newRestauracja.save();

        try {
            res.status(200).json(saveRestauracja);
        } catch (error) {
            res.status(400).json({ message: error });
        }
    }
});

// Usuwanie restauracji po ID

router.delete("/:id", async (req: any, res: any) => {
    try {
        const restaurant = await Restauracja.findByIdAndDelete(req.params.id);

        if (!restaurant) throw Error("Nie znaleziono restauracji!");
        res.status(200).json({ success: true });

        console.log(`Restauracja id:${req.params.id} usuniêta z bazy danych!`);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

// Update restauracji po ID

router.put("/:id", async (req: any, res: any) => {
    try {
        const restauracja = await Restauracja.findByIdAndUpdate(
            req.params.id,
            req.body
        );

        if (!restauracja)
            throw Error("Cos posz³o nie tak podczas aktualizacji restauracji!");
        res.status(200).json(req.body);

        console.log(`Restauracja id:${req.params.id} zaktualizowana!`);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

module.exports = router;
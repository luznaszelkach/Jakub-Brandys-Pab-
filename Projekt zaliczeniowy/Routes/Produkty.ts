import express from "express";
const router = express.Router();

const Produkt = require("../models/Produkt");

//Wyswietlenie listy wszystkich produktow z sortowaniem i paginacj¹ "?page=1&limit=2" - paginacja "?page=1&limit=2&sort=1" - paginacja i sortowanie

router.get("/", async (req: any, res: any) => {

    const page = req.query.page
    const limit = req.query.limit
    const sort = req.query.sort

    try {
        const produkty = await Produkt.find().skip((page - 1) * limit).limit(limit).sort({ "nazwa": sort });
        res.json(produkty);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

//Wyswietlenie konkretnego produktu

router.get("/:id", async (req: any, res: any) => {
    try {
        const produkty = await Produkt.findById(req.params.id);

        if (!produkty) throw Error("Nie znaleziono produktu!");
        res.status(200).json(produkty);

        console.log(`Produkt id:${req.params.id} zostal zwrocony do bazy danych!`);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

//Dodawanie produktów do bazy danych

router.post("/", async (req: any, res: any) => {
    const newProdukt = new Produkt({
        nazwa: req.body.nazwa,
        cena: req.body.cena,
        ilosc: req.body.ilosc,
        jednostkaMiary: req.body.jednostkaMiary
    });
    const saveProdukt = await newProdukt.save();

    try {
        res.status(200).json(saveProdukt);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

//Zglaszanie zapotrzebowania na produkty

router.post("/to-buy", async (req: any, res: any) => {
    const newProdukt = new Produkt({
        nazwa: req.body.nazwa,
        cena: req.body.cena,
        ilosc: req.body.ilosc,
        jednostkaMiary: req.body.jednostkaMiary
    });
    const saveProdukt = await newProdukt.save();

    try {
        res.status(200).json(saveProdukt);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

//Usuwanie produktu po ID

router.delete("/:id", async (req: any, res: any) => {
    try {
        const produkty = await Produkt.findByIdAndDelete(req.params.id);

        if (!produkty) throw Error("Nie znaleziono produktu!");
        res.status(200).json({ success: true });

        console.log(`Produkt id:${req.params.id} zostal usuniety z bazy danych!`);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

//Usuwanie wszystkich produktów

router.delete("/", async (req: any, res: any) => {
    try {
        const produkty = await Produkt.remove();

        if (!produkty) throw Error("Nie znaleziono produktu!");
        res.status(200).json({ success: true });

        console.log(`Wszystkie produkty zostaly usuniete z bazy danych!`);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

// Update produktu po ID

router.put("/:id", async (req: any, res: any) => {
    try {
        const produkty = await Produkt.findByIdAndUpdate(
            req.params.id,
            req.body
        );

        if (!produkty)
            throw Error("Cos poszlo nie tak podczas aktualizacji produktu!");
        res.status(200).json(req.body);

        console.log(`Produkt id:${req.params.id} zaktualizowany!`);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

module.exports = router;

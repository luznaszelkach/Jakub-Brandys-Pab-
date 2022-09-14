import express from "express";
import mongoose from "mongoose";

const router = express.Router();

const Zamowienie = require("../models/Zamowienie");


router.get("/", async (req: any, res: any) => {
    try {
        const zamowienia = await Zamowienie.find()
            .populate("pracownik")
            .populate("pozycje")
            .populate("stolik");
        res.json(zamowienia);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});


router.get("/:id", async (req: any, res: any) => {
    try {
        const zamowienia = await Zamowienie.findById(req.params.id);

        if (!zamowienia) throw Error("Nie znaleziono zamowienia!");
        res.status(200).json(zamowienia);

        console.log(`Zamowienie id:${req.params.id} zostalo zwrocone do bazy danych!`);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});


router.get("/table-raport/:id", async (req: any, res: any) => {
    try {
        const zamowienia = await Zamowienie.find({ stolik: req.params.id });

        if (!zamowienia) throw Error("Nie znaleziono zamowienia dla tego stolika!");
        res.status(200).json(zamowienia);

        console.log(`Zamowienia zwrocone do bazy danych!`);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.get("/waiter-raport/:id", async (req: any, res: any) => {
    try {
        const orders = await Zamowienie.find({ pracownik: req.params.id });

        if (!orders) throw Error("Nie znaleziono zamowienia dla tego kelnera                                                                                                                                                                                                                                                                !");
        res.status(200).json(orders);

        console.log(`Zamowienie id:${req.params.id} zwrocono do bazy danych!`);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});


router.post("/", async (req: any, res: any) => {

    const newZamowienie = new Zamowienie({
        pracownik: new mongoose.Types.ObjectId(req.body.pracownik),
        pozycje: req.body.pozycje,
        statusZamowienia: req.body.statusZamowienia,
        stolik: new mongoose.Types.ObjectId(req.body.stolik),
        kwota: req.body.kwota,
    });

    const saveZamowienie = await newZamowienie.save();
    try {
        res.status(200).json(saveZamowienie);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});


router.delete("/:id", async (req: any, res: any) => {
    try {
        const zamowienia = await Zamowienie.findByIdAndDelete(req.params.id);

        if (!zamowienia) throw Error("Nie znaleziono zamowienia!");
        res.status(200).json({ success: true });

        console.log(`Zamowienie id:${req.params.id} usuniete z bazy danych!`);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});


router.delete("/", async (req: any, res: any) => {
    try {
        const zamowienia = await Zamowienie.remove();

        if (!zamowienia) throw Error("Nie znaleziono zamowienia!");
        res.status(200).json({ success: true });

        console.log(`Usunieto wszystkie zamowienia z bazy danych!`);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});


router.put("/:id", async (req: any, res: any) => {
    try {
        const zamowienia = await Zamowienie.findByIdAndUpdate(req.params.id, req.body);

        if (!zamowienia) throw Error("Coœ posz³o nie tak podczas aktualizacji zamowienia!");
        res.status(200).json(req.body);

        console.log(`Zamowienie id:${req.params.id} zaktualizowane!`);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

module.exports = router;
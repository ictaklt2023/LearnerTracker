const express = require('express');
const router = express.Router();

//Load Batch model
const Batch = require('../../models/Batches');

//View All Batch
router.get('/', async (req, res) => {
    try {
        const batches = await Batch.find();
        res.send(batches);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//View Batch by Id
router.get('/:id', async (req, res) => {
    try {
        const batch = await Batch.findById(req.params.id);
        res.send(batch);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Add Batch
router.post('/', async (req, res) => {
    const data = new Batch({
        batchCode: req.body.batchCode,
        batchName: req.body.batchName
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Edit Batch
router.put('/', async (req, res) => {
    try {
        const id = req.body._id;
        const data = req.body;
        const result = await Batch.updateOne({ "_id": id }, data);
        res.send(result);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Delete Batch
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await Batch.findOneAndDelete({ "_id": id }, data);
        res.send(result);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
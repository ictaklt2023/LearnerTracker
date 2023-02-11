const express = require('express');
const router = express.Router();

//Load Learners model
const Learner = require('../../models/Learners');

//View All Learners
router.get('/', async (req, res) => {
    try {
        const learners = await Learner.find();
        res.status(200).json({ status: 'OK', data: learners })
    }
    catch (error) {
        res.status(500).json({ status: 'Error', message: error.message })
    }
});

//View Learner by Id
router.get('/:id', async (req, res) => {
    try {
        const learner = await Learner.findById(req.params.id);
        res.status(200).json({ status: 'OK', data: learner });
    }
    catch (error) {
        res.status(500).json({ status: 'Error', message: error.message });
    }
});

//Add Learner
router.post('/', async (req, res) => {
    let result = Learner.find({ learnerId: req.body.learnerId }, async (err, data) => {
        if (data.length > 0) {
            res.status(200).json({status: 'Error', message: "Learner Id is already in use!" });
        }
        else {
            const data = new Learner({
                learnerId: req.body.learnerId,
                learnerName: req.body.learnerName,
                courseName: req.body.courseName,
                project: req.body.project,
                batch: req.body.batch,
                courseStatus: req.body.courseStatus,
                placementStatus: req.body.placementStatus
            });
            try {
                const dataToSave = await data.save();
                res.status(200).json({ status: 'OK', data: dataToSave });
            }
            catch (error) {
                res.status(500).json({ status: 'Error', message: error.message });
            }
        }
    });
});

//Edit Learner
router.put('/', async (req, res) => {
    try {
        const id = req.body._id;
        const data = req.body;
        const result = await Learner.updateOne({ "_id": id }, data);
        res.status(200).json({ status: 'OK', data: result });
    }
    catch (error) {
        res.status(500).json({ status: 'Error', message: error.message });
    }
});

//Update Learner's Placement Status
router.put('/placementstatus', async (req, res) => {
    try {
        const id = req.body._id;
        const pstatus = req.body.placementStatus;
        const result = await Learner.updateOne(
            { "_id": id },
            { $set: { "placementStatus": pstatus } });
        res.status(200).json({ status: 'OK', data: result });
    }
    catch (error) {
        res.status(500).json({ status: 'Error', message: error.message });
    }
});

//Delete Course
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await Learner.findOneAndDelete({ "_id": id }, data);
        res.status(200).json({ status: 'OK', data: result });
    }
    catch (error) {
        res.status(500).json({ status: 'Error', message: error.message });
    }
});

module.exports = router;
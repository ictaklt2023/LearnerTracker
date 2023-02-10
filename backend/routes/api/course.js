const express = require('express');
const router = express.Router();

//Load Course model
const Course = require('../../models/Courses');

//View All Course
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.send(courses);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//View Course by Id
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        res.send(course);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Add Course
router.post('/', async (req, res) => {
    const data = new Course({
        courseCode: req.body.courseCode,
        courseName: req.body.courseName
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Edit Course
router.put('/', async (req, res) => {
    try {
        const id = req.body._id;
        const data = req.body;
        const result = await Course.updateOne({ "_id": id }, data);
        res.send(result);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Delete Course
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await Course.findOneAndDelete({ "_id": id }, data);
        res.send(result);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();

//Load Course model
const Course = require('../../models/Courses');

//View All Course
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json({ status: 'OK', data: courses });
    }
    catch (error) {
        res.status(500).json({ status: 'Error', message: error.message });
    }
});

//View Course by Id
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        res.status(200).json({ status: 'OK', data: course });
    }
    catch (error) {
        res.status(500).json({ status: 'Error', message: error.message });
    }
});

//Add Course
router.post('/', async (req, res) => {
    let result = Course.find({ courseName: req.body.courseName }, async (err, data) => {
        if (data.length > 0) {
            res.status(200).json({ status: 'Error',  "message": "Course Name is already in use!" });
        }
        else {
            const data = new Course({
                courseCode: req.body.courseCode,
                courseName: req.body.courseName
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

//Edit Course
router.put('/', async (req, res) => {
    try {
        const id = req.body._id;
        const data = req.body;
        const result = await Course.updateOne({ "_id": id }, data);
        res.status(200).json({ status: 'OK', data: result });
        // const isOk = true;
        // let result = Course.find({ courseName: req.body.courseName }, async (err, data) => {
        //     if (data.length > 0) {
        //         if (data._id != req.body._id) {
        //             isOk = false;
        //             res.status(200).json({ status: 'Error', "message": "Course Name is already in use!" });
        //         }
        //     }
        //     if (isOk) {
        //         const id = req.body._id;
        //         const data = req.body;
        //         const result = await Course.updateOne({ "_id": id }, data);
        //         res.status(200).json({ status: 'OK', data: result })
        //     }
        // })
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
        const result = await Course.findOneAndDelete({ "_id": id }, data);
        res.status(200).json({ status: 'OK', data: result });
    }
    catch (error) {
        res.status(500).json({ status: 'Error', message: error.message });
    }
});

module.exports = router;
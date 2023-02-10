const express = require('express');
const router = express.Router();

//Load Project model
const Project = require('../../models/Projects');

//View All Project
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.send(projects);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//View Project by Id
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        res.send(project);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Add Project
router.post('/', async (req, res) => {
    const data = new Project({
        projectCode: req.body.projectCode,
        projectName: req.body.projectName
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Edit Project
router.put('/', async (req, res) => {
    try {
        const id = req.body._id;
        const data = req.body;
        const result = await Project.updateOne({ "_id": id }, data);
        res.send(result);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Delete Project
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await Project.findOneAndDelete({ "_id": id }, data);
        res.send(result);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
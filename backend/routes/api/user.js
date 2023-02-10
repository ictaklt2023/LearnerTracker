const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../../models/Users');

router.post('/login', async (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    let result = User.find({ username: username }, (err, data) => {
        if (data.length > 0) {
            const passwodValidator = bcrypt.compareSync(password, data[0].password);
            if (passwodValidator) {
                res.json({ "status": "OK", "data": data });
            }
            else {
                res.json({ "status": "Error", "message": "Invalid password" });
            }
        }
        else {
            res.json({ "status": "Error", "message": "Invalid user" });
        }
    })
});

//View All Users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//View User by Id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.send(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Add User
router.post('/', async (req, res) => {
    let result = User.find({ username: req.body.username }, async(err, data) => {
        console.log('data='+data);
        if (data.length > 0) {
            res.status(400).json({ message: "Username is already in use!" });
        }
        else
        {
            const data = new User({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 10),
                usertype:req.body.usertype 
            });
        
            try {
                const dataToSave = await data.save();
                res.status(200).json(dataToSave);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        }
    });
   
});

//Edit User
router.put('/', async (req, res) => {
    try {
        const id = req.body._id;
        const data = new User({
            _id:req.body._id,
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10),
            usertype:req.body.usertype 
        });
        const result = await User.updateOne({ "_id": id }, data);
        res.send(result);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Delete User
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const result = await User.findOneAndDelete({ "_id": id }, data);
        res.send(result);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
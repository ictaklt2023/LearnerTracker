const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors');

const app=express();
const user =require('./routes/api/user');
const course =require('./routes/api/course');
const batch =require('./routes/api/batch');
const project =require('./routes/api/project');
const learner =require('./routes/api/learner');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect Database
connectDB();
const port =8062;

app.use('/api/user',user);
app.use('/api/course',course); 
app.use('/api/batch',batch);
app.use('/api/project',project);
app.use('/api/learner', learner);
app.listen(port, ()=> console.log(`Server running on port ${port}`));
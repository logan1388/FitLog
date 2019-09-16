const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');
//const index = require('./routes/api/index');

connectDB();

var corsOption = {
    origin: true,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};

app.use(cors(corsOption));
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running!'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/exercises', require('./routes/api/exercises'));
app.use('/api/workoutlog', require('./routes/api/workoutlog'));

//app.use('/api/v1', index);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
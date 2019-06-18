const express = require('express');
const app = express();
const connectDB = require('./config/db');

connectDB();
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running!'));

app.use('/api/users', require('./routes/api/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
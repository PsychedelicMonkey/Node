const express = require('express');
const dotenv = require('dotenv');
const expressLayout = require('express-ejs-layouts');

dotenv.config();
const app = express();

app.use(expressLayout);
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

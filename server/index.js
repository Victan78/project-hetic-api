const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const puppeteer = require('puppeteer');
const cvTemplate = require('./documents/CV/cvModel');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const path = require('path');
const fs = require('fs');
const port = process.env.PORT || 5000;
const db = new sqlite3.Database('pdfGenerator.db');
const fetchpdf = require('./routes/fetchpdf');
const createpdf = require('./routes/createpdf');
const logup = require('./routes/logup');
const getuser = require('./routes/getuser');
const login = require('./routes/login');
const getuserpdf = require('./routes/getuserpdf');
const bcrypt = require('bcrypt');

// Exécution d'une requête SQL pour créer une table (si elle n'existe pas)
db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, email TEXT, password TEXT)');
db.run('CREATE TABLE IF NOT EXISTS pdfs (id INTEGER PRIMARY KEY, email TEXT, pdfPath TEXT)');
app.use(cors('*'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/fetch-cv', fetchpdf);
app.use('/create-cv', createpdf);
app.use('/getuserpdf', getuserpdf);
app.use('/logup', logup);
app.use('/getuser', getuser);
app.use('/login', login);


app.get('/', (req, res) => {
    res.send('Bienvenue');
});




process.on('SIGINT', () => {
    db.close();
    process.exit();
});

app.listen(port, () => console.log(`Listening on port ${port}`));

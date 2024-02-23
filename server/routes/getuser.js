const getuser = require('express').Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('pdfGenerator.db');
getuser.get('/', (req, res) => {
    try {
        db.all('SELECT * FROM users', (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ users: rows });
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

getuser.get('/:username', (req, res) => {
    try {
        const username = req.params.username;
        db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ user: row });
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = getuser;
const getuserpdf = require('express').Router();
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('pdfGenerator.db');

const getuserpdfbyemail = (email) => {
    return new Promise((resolve, reject) => {
        const selectQuery = 'SELECT * FROM pdfs WHERE email = ?';
        db.get(selectQuery, [email], (err, row) => {
            if (err) {
                reject(err);
            }
            resolve(row);
        });
    });
};

getuserpdf.get('/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const pdf = await getuserpdfbyemail(email);
        if (!pdf) {
            return res.status(404).json({ error: 'Aucun pdf trouvé pour cet utilisateur' });
        }
        const pdfFilePath = path.join(__dirname, pdf.pdfPath);
        const pdfStream = fs.createReadStream(pdfFilePath);
        pdfStream.pipe(res);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = getuserpdf;
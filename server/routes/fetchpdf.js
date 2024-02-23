
const fetchpdf = require('express').Router();

const path = require('path');

const fs = require('fs');

fetchpdf.get('/', (req, res) => {
    try{  const pdfFilePath = path.join(__dirname, 'result.pdf');
    const fileStream = fs.createReadStream(pdfFilePath);

    fileStream.on('open', () => {
        res.setHeader('Content-Type', 'application/pdf');
        fileStream.pipe(res);
    });

    fileStream.on('error', (err) => {
        console.error('Erreur lors de la lecture du fichier PDF:', err);
        res.status(500).send('Erreur lors de la récupération du fichier PDF');
    });}
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})


module.exports = fetchpdf;
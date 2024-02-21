const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const puppeteer = require('puppeteer');

const cvTemplate = require('./documents/CV/cvModel');

const app = express();
const path = require('path');
const fs = require('fs');
const port = process.env.PORT || 5000;

app.use(cors('*'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/create-pdf', async (req, res) => {
    const pdfFilePath = path.join(__dirname, 'result.pdf');
    
    const browser = await puppeteer.launch({
        headless: 'new',
        executablePath: './chromedriver_win32/chromedriver.exe', // Remplacez par le chemin vers ChromeDriver sur votre serveur
    });
    const page = await browser.newPage();
    
    // Utilisez la page Puppeteer pour générer le PDF
    await page.setContent(cvTemplate(req.body));
    await page.pdf({ path: pdfFilePath, format: 'A4' });

    await browser.close();

    res.send('PDF créé avec succès');
});
app.get('/fetch-pdf', (req, res) => {
    const pdfFilePath = path.join(__dirname, 'result.pdf');
    const fileStream = fs.createReadStream(pdfFilePath);

    fileStream.on('open', () => {
        res.setHeader('Content-Type', 'application/pdf');
        fileStream.pipe(res);
    });

    fileStream.on('error', (err) => {
        console.error('Erreur lors de la lecture du fichier PDF:', err);
        res.status(500).send('Erreur lors de la récupération du fichier PDF');
    });
});

app.get('/', (req, res) => {
    res.send('Bienvenue');
});

app.post('/create-cv', async (req, res) => {
    const cvFilePath = path.join(__dirname, 'cv.pdf');

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    
    await page.setContent(cvTemplate(req.body));
    await page.pdf({ path: cvFilePath, format: 'A4' });

    await browser.close();

    res.send('CV créé avec succès');
});

app.get('/fetch-cv', (req, res) => {
    const cvFilePath = path.join(__dirname, 'cv.pdf');
    const fileStream = fs.createReadStream(cvFilePath);

    fileStream.on('open', () => {
        res.setHeader('Content-Type', 'application/pdf');
        fileStream.pipe(res);
    });

    fileStream.on('error', (err) => {
        console.error('Erreur lors de la lecture du fichier CV:', err);
        res.status(500).send('Erreur lors de la récupération du fichier CV');
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

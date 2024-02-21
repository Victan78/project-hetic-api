const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');

const pdfTemplate = require('./documents');
const cvTemplate = require('./documents/CV/cvModel');


const app = express();
const path = require('path');
const fs = require('fs');
const port = process.env.PORT || 5000;
const phantomjs = require('phantomjs-prebuilt');
const path = require('path');



app.use(cors('*'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/create-pdf', (req, res) => {
    const pdfFilePath = path.join(__dirname, 'result.pdf');

    const pdfOptions = {
        phantomPath: phantomjs.path,
        format: 'A4',
        orientation: 'portrait',
        border: '10mm',
       
    };

    pdf.create(cvTemplate(req.body), pdfOptions).toFile(pdfFilePath, (err) => {
        if (err) {
            console.error('Erreur lors de la création du PDF:', err);
            return res.status(500).send(err);
        }

        res.send('PDF créé avec succès');
    });
});

app.get('/fetch-pdf', (req, res) => {
    const pdfFilePath = `${__dirname}/result.pdf`;
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
    

    



app.post('/create-cv', (req, res) => {
    const cvFilePath = path.join(__dirname, 'cv.pdf');

    pdf.create(cvTemplate(req.body), {}).toFile(cvFilePath, (err) => {
        if (err) {
            console.error('Erreur lors de la création du CV:', err);
            return res.status(500).send(err);
        }

        res.send('CV créé avec succès');
    });
})

app.get('/fetch-cv', (req, res) => {
    const cvFilePath = `${__dirname}/cv.pdf`;
    const fileStream = fs.createReadStream(cvFilePath);

    fileStream.on('open', () => {
        res.setHeader('Content-Type', 'application/pdf');
        fileStream.pipe(res);
    }
    );

    fileStream.on('error', (err) => {
        console.error('Erreur lors de la lecture du fichier CV:', err);
        res.status(500).send('Erreur lors de la récupération du fichier CV');
    }
    );
}
);

app.listen(port, () => console.log(`Listening on port ${port}`));

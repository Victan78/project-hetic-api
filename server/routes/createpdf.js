const createpdf = require('express').Router();

const express = require('express');


const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('pdfGenerator.db');
const cors = require('cors');

const puppeteer = require('puppeteer');

const cvTemplate = require('../documents/CV/cvModel');


const path = require('path');

const fs = require('fs');

createpdf.post('/', async (req, res) => {
    try{ const pdfFilePath = path.join(__dirname, 'result.pdf');
    console.log("starting puppeteer...");

    
    const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    console.log("puppeteer started");
    const page = await browser.newPage();
    console.log("page created");

    
    // Utilisez la page Puppeteer pour générer le PDF
    await page.setContent(cvTemplate(req.body));
    console.log("content set");
    await page.pdf({ path: pdfFilePath, format: 'A4' });
    console.log("pdf created");

    await browser.close();
    console.log("browser closed");
    //enregistrer le pdf dans la base de donnees
    const pdfId = await savepdftodbwithusermail(req.body.email, req.body);
    console.log("pdf saved in db with id:", pdfId);

    res.send('PDF créé avec succès');}
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})

const savepdftodbwithusermail = (email, pdfFilePath) => {
    return new Promise((resolve, reject) => {
       //enregistrer tout les parametres du pdf dans la base de donnees
        const insertQuery = 'INSERT INTO pdfs (email, pdfPath) VALUES (?, ?)';
        db.run(insertQuery, [email, pdfFilePath], function (err) {
            if (err) {
                reject(err);
            }
            resolve(this.lastID);
        });
    });
}

module.exports = createpdf;
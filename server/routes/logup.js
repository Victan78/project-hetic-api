const logup = require('express').Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('pdfGenerator.db');
const bcrypt = require('bcrypt');

logup.post('/', async (req, res) => {
    try{ const { username, email, password } = req.body;
    
    // Vérification si l'utilisateur existe déjà
    const UserExistance = await getUserByUsername(username);
    if (UserExistance) {
        return res.status(400).json({ error: 'Utilisateur existe déjas' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertion de l'utilisateur dans la base de données
    const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.run(insertQuery, [username, email, hashedPassword], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'User enregistrer avec success !!' });
    });}
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})
const getUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        const selectQuery = 'SELECT * FROM users WHERE username = ?';
        db.get(selectQuery, [username], (err, row) => {
            if (err) {
                reject(err);
            }
            resolve(row);
        });
    });
};
module.exports = logup;
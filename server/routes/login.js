const login = require('express').Router();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('pdfGenerator.db');
const bcrypt = require('bcrypt');

login.post('/', async (req, res) => {
    try{  const { username, password } = req.body;

    // Récupération de l'utilisateur par nom d'utilisateur
    const user = await getUserByUsername(username);
    if (!user) {
        return res.status(401).json({ error: 'Invalid username' });
    }

    // Vérification du mot de passe
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ error: 'farrr' });
    }

//renvoyer les donnes de l'utilisateur sans le mot de passe
    res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email
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
                console.log("err", err);
                reject(err);
            }
           //renvoyer les donnes de l'utilisateur sans le mot de passe
            resolve(row);

        });
    });
};

module.exports = login;

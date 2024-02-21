

---
Je précise que le back n'est pas déployer il faudrais tester l'appli en local
# Générateur de PDF avec Stockage Firebase

Ce projet est une application de génération de PDF côté serveur utilisant Node.js pour le backend et React pour le frontend. Les PDF générés sont ensuite stockés dans Firebase Storage. 

## Configuration initiale

### Backend (Node.js)

1. Assurez-vous d'avoir Node.js installé sur votre machine.
2. Clonez le dépôt du projet.

```bash
git clone https://votre-url-du-repo.git
cd backend
```

3. Installez les dépendances.

```bash
npm install
```

4. Créez un fichier `.env` à la racine du dossier backend avec les configurations Firebase.


5. Lancez le serveur.

```bash
npm start
```

Le backend sera accessible à l'adresse `http://localhost:5000`.

### Frontend (React)

1. Allez dans le répertoire frontend.

```bash
cd frontend
```

2. Installez les dépendances.

```bash
npm install
```

3. Lancez l'application React.

```bash
npm run dev
```



## Utilisation

1.connecter vous avec facebook github ou google
2. Remplissez le formulaire pour générer un PDF.
3. Le PDF généré sera stocké dans Firebase Storage.

---

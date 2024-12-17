// Importation des modules necessaires
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const app = express();
const PORT = 4000;

// Middleware
app.use(bodyParser.json());

// Configuration de la connexion MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin", // Remplacer par votre mot de passe
  database: "bookset",
});

// Connexion a la base de donnees
db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion a MySQL:", err);
    return;
  }
  console.log("Connecte a la base de donnees MySQL.");
});

// Route par defaut
app.get("/", (req, res) => {
  res.send("Bienvenue sur le serveur Bookset!");
});

// Route pour recuperer tous les utilisateurs
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      res.status(500).send("Erreur serveur");
      throw err;
    }
    res.json(results);
  });
});

// Route pour ajouter un utilisateur
app.post("/users", (req, res) => {
  const { username, password_hash, email } = req.body;
  const sql =
    "INSERT INTO users (username, password_hash, email) VALUES (?, ?, ?)";
  db.query(sql, [username, password_hash, email], (err, result) => {
    if (err) {
      res.status(500).send("Erreur lors de l ajout de l utilisateur");
      throw err;
    }
    res.status(201).send("Utilisateur ajoute avec succes");
  });
});

// Route pour recuperer tous les livres
app.get("/books", (req, res) => {
  db.query("SELECT * FROM books", (err, results) => {
    if (err) {
      res.status(500).send("Erreur serveur");
      throw err;
    }
    res.json(results);
  });
});

// Route pour ajouter un livre
app.post("/books", (req, res) => {
  const { title, author, published_date, genre } = req.body;
  const sql =
    "INSERT INTO books (title, author, published_date, genre) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, author, published_date, genre], (err, result) => {
    if (err) {
      res.status(500).send("Erreur lors de l ajout du livre");
      throw err;
    }
    res.status(201).send("Livre ajoute avec succes");
  });
});

// Route pour lier un utilisateur a un livre (user_books)
app.post("/user_books", (req, res) => {
  const { user_id, book_id, status } = req.body;
  const sql =
    "INSERT INTO user_books (user_id, book_id, status) VALUES (?, ?, ?)";
  db.query(sql, [user_id, book_id, status], (err, result) => {
    if (err) {
      res.status(500).send("Erreur lors de la liaison utilisateur-livre");
      throw err;
    }
    res.status(201).send("Livre ajoute a l utilisateur avec succes");
  });
});

// Demarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur demarre sur http://localhost:${PORT}`);
});

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'manager',
  database: 'Book_Tb',
});


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});


app.use(bodyParser.json());


app.get('/books', (req, res) => {
  const author = req.query.author;

  const query = 'SELECT * FROM Book ';
  connection.query(query, [author], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query: ', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});


app.post('/books', (req, res) => {
  const book = req.body;

  const query = 'INSERT INTO Book (b_name, author, book_type, price, publishedDate, language) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(query, [book.b_name, book.author, book.book_type, book.price, book.publishedDate, book.language], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query: ', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.sendStatus(201);
  });
});


app.put('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const { price, language } = req.body;

  const query = 'UPDATE Book SET price = ?, language = ? WHERE id = ?';
  connection.query(query, [price, language, bookId], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query: ', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.sendStatus(200);
  });
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

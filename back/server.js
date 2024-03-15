const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'fouduplat'
});

db.connect((err) => {
  if (err) {
    console.error('Failed to connect to the fouduplat database', err);
  } else {
    console.log('Connected to the fouduplat database');
  }
});
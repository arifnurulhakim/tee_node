// const mongoose = require('mongoose');
// const connectionString = process.env.DB_CONNECTION_STRING;

// mongoose.connect(connectionString, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.once('open', () => {
//   console.log('Database connected successfully');
// });

// db.on('error', (err) => {
//   console.error('Database connection error:', err);
// });

// module.exports = db;


const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize('nodejstes-main-db-030ef8fbe65d73692', 'nodejstes-main-db-030ef8fbe65d73692', 'NXneRzcUFRpHQaDASc3WUemMpjbSgD', {
  host: 'user-prod-us-east-2-1.cluster-cfi5vnucvv3w.us-east-2.rds.amazonaws.com',
  dialect: 'postgres',
  port: 5432,
  dialectOptions: {
    ssl: {
      ca: fs.readFileSync(path.join(__dirname, 'path', 'root-certs.crt')),
    },
  },
});

module.exports = sequelize;
// const { Poll } = require('pg');

// const pool = new Pool({

//   host: 'db', // Menggunakan nama kontainer 'db' sebagai host
//   port: 5432, // Port yang digunakan oleh kontainer PostgreSQL
//   user: 'postgres',
//   password: 'qweqwe',
//   db: 'js'
// });

// module.exports = pool;




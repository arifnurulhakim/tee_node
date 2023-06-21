// require('dotenv').config();
// const express = require('express');
// const bodyParser = require('body-parser');
// const userRoutes = require('./app/routes/userRoutes');
// const mongoose = require('mongoose');
// const nodemailer = require('nodemailer');
// const sendinblueTransport = require('nodemailer-sendinblue-transport');

// const app = express();
// const port = process.env.PORT || 3000;

// // Parse incoming requests with JSON payloads
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // Connect to the database
// mongoose.connect(process.env.DB_CONNECTION_STRING, {
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

// // Create a Nodemailer transporter using SMTP
// const transporter = nodemailer.createTransport({
//     host: process.env.MAIL_HOST,
//     port: process.env.MAIL_PORT,
//     secure: false, // Set it to true if using TLS
//     auth: {
//       user: process.env.MAIL_USERNAME,
//       pass: process.env.MAIL_PASSWORD,
//     },
//   });

// // Define routes
// app.use('/api', userRoutes);

// // Start the server
// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema.js');
const resolvers = require('./graphql/resolvers.js');
const userRoutes = require('./app/routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Parse incoming requests with JSON payloads
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to the database
const sequelize = new Sequelize('js', 'postgres', 'qweqwe', {
  host: 'db',
  dialect: 'postgres',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfssssssully');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

// Create ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use('/api', userRoutes);

// Apply ApolloServer as middleware
server.start().then(() => {
  server.applyMiddleware({ app });
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

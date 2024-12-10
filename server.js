require('dotenv').config() // Load environment variables

const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan') // Use Morgan for HTTP request logging

const app = express();
const PORT = process.env.PORT || 8080

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not defined in the .env file.")
    process.exit(1)
}

// Database Connection
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Connected to database'))
    .catch((error) => console.error('Database connection error:', error))

// Middleware
app.use(express.json()) // Parse JSON requests
app.use(morgan('tiny')) // Log HTTP requests

// Routes
const ticketRoutes = require('./server/routes/tickets'); // Ensure this file exists
app.use('/tickets', ticketRoutes)

app.get('/', (req, res) => {
    res.send("Ticketmaster")
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})
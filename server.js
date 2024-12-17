require('dotenv').config() // Load environment variables

const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan') // Use Morgan for HTTP request logging
const bodyParser = require('body-parser')
const path = require('path') // Import the path module

const app = express()
const PORT = process.env.PORT || 8080

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not defined in the .env file.")
    process.exit(1)
}

// Database Connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to the database'))
    .catch((error) => {
        console.error('Database connection error:', error)
        process.exit(1) // Exit the app if the database connection fails
    })

// Middleware
app.use(express.json()) // Parse JSON requests
app.use(morgan('tiny')) // Log HTTP requests
app.use(bodyParser.urlencoded({ extended: true })) // Parse URL-encoded requests

// Static assets and view engine setup
const angularAppPath = path.join(__dirname, 'ticketmaster-app/src')
app.use(express.static(angularAppPath)) // Serve static Angular files

app.use('/css', express.static(path.resolve(__dirname, "assets/css"))) // Load CSS assets
app.use('/img', express.static(path.resolve(__dirname, "assets/img"))) // Load image assets
app.use('/js', express.static(path.resolve(__dirname, "assets/js"))) // Load JavaScript assets

// Routes
const ticketRoutes = require('./server/routes/tickets'); // Ensure this file exists
app.use('/tickets', ticketRoutes)

// Serve Angular index.html for all other routes (fallback route)
app.get('*', (req, res) => {
    res.sendFile(path.join(angularAppPath, 'index.html'))
})

// Start Server
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})

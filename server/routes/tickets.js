const express = require('express')
const router = express.Router()

//Getting All
router.get('/', (req, res) => {
    res.send('Get All')
})

//Getting Ticket
router.get('/:id', (req, res) => {

})

//Creating Ticket
router.post('/', (req, res) => {

})

//Updating Ticket
router.patch('/', (req, res) => {

})

//Deleting Ticket
router.delete('/:id', (req, res) => {

})


module.exports = router
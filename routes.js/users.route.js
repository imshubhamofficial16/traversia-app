const express =  require('express')
const router = express.Router()
const users = require('../controllers/users.controllers')

router.get('/users', users.getUsers)
router.get('/users/:id', users.getUserById)
router.patch('/users/:id', users.updateUser)
router.delete('/users/:id', users.deleteUser)

module.exports = router
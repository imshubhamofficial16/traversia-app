const express =  require('express')
const router = express.Router()
const items = require('../controllers/items.controllers')

router.post('/items',items.createItem )
router.get('/items', items.getItems)
router.get('/items/:id', items.getItemById)
router.patch('/items/:id', items.updateItem)
router.delete('/items/:id', items.deleteItem)

module.exports = router
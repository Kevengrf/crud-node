const express = require('express');
const { getAllItems, getItemById, createItem, updateItem, deleteItem } = require('../controllers/items.controller');

const router = express.Router();

// Rotas CRUD
router.get('/', getAllItems);          
router.get('/:id', getItemById);    
router.post('/', createItem);          
router.put('/:id', updateItem);       
router.delete('/:id', deleteItem);     

module.exports = router;

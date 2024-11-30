const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '../data/items.json');

const loadData = () => {
    if (!fs.existsSync(dataFile)) {
        fs.writeFileSync(dataFile, JSON.stringify([]));
    }
    const data = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(data);
};

const saveData = (data) => {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

// GET /items
const getAllItems = (req, res) => {
    const items = loadData();
    res.json(items);
};

// GET /items/:id
const getItemById = (req, res) => {
    const items = loadData();
    const { id } = req.params;
    const item = items.find((i) => i.id === parseInt(id));
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item não encontrado' });
    }
};

// POST /items
const createItem = (req, res) => {
    const items = loadData();
    const { name, description } = req.body;

    const newItem = {
        id: items.length > 0 ? items[items.length - 1].id + 1 : 1, 
        name,
        description,
    };

    items.push(newItem);
    saveData(items);
    res.status(201).json(newItem);
};

// PUT /items/:id
const updateItem = (req, res) => {
    const items = loadData();
    const { id } = req.params;
    const { name, description } = req.body;

    const item = items.find((i) => i.id === parseInt(id));

    if (item) {
        item.name = name || item.name;
        item.description = description || item.description;
        saveData(items);
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item não encontrado' });
    }
};

// DELETE /items/:id
const deleteItem = (req, res) => {
    const items = loadData();
    const { id } = req.params;

    const updatedItems = items.filter((i) => i.id !== parseInt(id));

    if (items.length !== updatedItems.length) {
        saveData(updatedItems);
        res.status(204).send(); 
    } else {
        res.status(404).json({ message: 'Item não encontrado' });
    }
};

module.exports = {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
};

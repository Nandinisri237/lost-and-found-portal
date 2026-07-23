const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    finderName: String,
    phone: String,
    itemName: String,
    location: String,
    image: String,
    date: { type: Date, default: Date.now }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
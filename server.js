const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const Item = require('./Item');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));

// Multer setup for image upload
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected!'))
.catch((err) => console.log('Error:', err));
// Route to save item
app.post('/report', upload.single('image'), async (req, res) => {
    const item = new Item({
        finderName: req.body.finderName,
        phone: req.body.phone,
        itemName: req.body.itemName,
        location: req.body.location,
        image: req.file ? req.file.filename : ''
    });
    await item.save();
    res.redirect('/index.html');
});

// Route to get all items
app.get('/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});
// Route to get single item
app.get('/items/:id', async (req, res) => {
    const item = await Item.findById(req.params.id);
    res.json(item);
});

// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
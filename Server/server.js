// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Replace with your MongoDB connection string
const uri = 'mongodb+srv://adityajidhonde:60601111@cluster0.aghre.mongodb.net/name-initiater'; // Update with your MongoDB URI

const app = express();
const port = 5050;

app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define the Bookmark schema and model
const bookmarkSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Store user.sub from Auth0
    domainName: { type: String, required: true }, // Domain name
});
const Bookmark = mongoose.model('Bookmark', bookmarkSchema, 'bookmarks'); // Use 'bookmarks' as collection name

// Define the Industry schema and model
const industrySchema = new mongoose.Schema({
    Industry: String
});
const Industry = mongoose.model('Industry', industrySchema, 'industry'); // Use 'industry' as collection name

// Define the Extension schema and model
const extensionSchema = new mongoose.Schema({
    Extension: String
});
const Extension = mongoose.model('Extension', extensionSchema, 'extension'); // Use 'extension' as collection name

// Endpoint to get industries
app.get('/api/industries', async (req, res) => {
    try {
        const industries = await Industry.find();
        res.json(industries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching industries' });
    }
});

// Endpoint to get extensions
app.get('/api/extensions', async (req, res) => {
    try {
        const extensions = await Extension.find();
  
        res.json(extensions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching extensions' });
    }
});

// Get random extensions endpoint
app.get('/api/random-extensions', async (req, res) => {
    try {
        const extensions = await Extension.aggregate([{ $sample: { size: 3 } }]); // Get 3 random extensions
        res.json(extensions);
    } catch (error) {
        console.error('Error fetching random extensions:', error);
        res.status(500).send('Error fetching data');
    }
});

// Endpoint to add a bookmark
app.post('/api/bookmarks', async (req, res) => {
    const { userId, domainName } = req.body;
    try {
        const existingBookmark = await Bookmark.findOne({ domainName });

        if (existingBookmark) {
        return res.status(400).json({ error: 'Already bookmarked.' });
        }
        const newBookmark = new Bookmark({ userId, domainName });
        await newBookmark.save();
        res.status(201).json({ message: 'Bookmark added successfully' });
    } catch (error) {
        console.error('Error adding bookmark:', error);
        res.status(500).json({ message: 'Error adding bookmark' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
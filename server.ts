// Import required packages
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Import the 'cors' package

// Create an Express application
const app = express();
const port = process.env.PORT || 3000;

// Set up MongoDB connection
mongoose.connect('mongodb://localhost/myfullstack', {
  useNewUrlParser: true, // MongoDB option
  useUnifiedTopology: true,
});

// Define a MongoDB schema for folders
const folderSchema = new mongoose.Schema({
  name: String, // Example: Name of the folder
  // Add other properties as needed
});

// Create a model for folders based on the schema
const Folder = mongoose.model('Folder', folderSchema);

// Set up middleware (body parser and CORS)
app.use(express.json());
app.use(cors());

// Define your API routes for reading, creating, updating, and deleting folders
// Example routes:

// Read folder structure
app.get('/api/folder-structure', async (req, res) => {
  try {
    const folders = await Folder.find();
    res.json(folders);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new folder
app.post('/api/folders', async (req, res) => {
  const { name } = req.body;
  try {
    const folder = new Folder({ name });
    await folder.save();
    res.status(201).json(folder);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a folder
app.put('/api/folders/:id', async (req, res) => {
  // ... Your update folder route code here ...
});

// Delete a folder
app.delete('/api/folders/:id', async (req, res) => {
  // ... Your delete folder route code here ...
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

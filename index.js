const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/theme_preference', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Schema Definition
const userPreferenceSchema = new mongoose.Schema({
  theme: { type: String, required: true }
});

const UserPreference = mongoose.model('UserPreference', userPreferenceSchema, 'userPreferences');

// API Endpoint
app.post('/api/theme', async (req, res) => {
  try {
    const { theme } = req.body;

    const newPreference = new UserPreference({ theme });
    await newPreference.save();

    res.json({ success: true, theme });
  } catch (error) {
    console.error('Error saving theme preference:', error);
    res.status(500).json({ success: false, error: 'Failed to save theme preference' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

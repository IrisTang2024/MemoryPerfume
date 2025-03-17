const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname)));

// Simple server status endpoint
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'running', 
    message: 'Memory Fragrance API is operational',
    timestamp: new Date().toISOString()
  });
});

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Initialize OpenAI
let openaiClient;
try {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not set in environment variables');
  }

  openaiClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  console.log('✅ OpenAI client initialized successfully');
} catch (error) {
  console.error('❌ Failed to initialize OpenAI client:', error.message);
}

// API endpoint to analyze image and generate fragrance description
app.post('/api/analyze-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    
    const base64Image = req.file.buffer.toString('base64');
    const imageUrl = `data:${req.file.mimetype};base64,${base64Image}`;
    
    const prompt = `
    You are a master perfumer at a prestigious luxury fragrance house, skilled in translating visual memories into bespoke fragrances for elite clientele.
    
    Analyze this image and create a complete fragrance profile with the following sections:
    
    1. NAME: A sophisticated, luxury fragrance name (no special characters or formatting)
    
    2. PHOTO INSPIRATION: A concise analysis (25-30 words) of the key visual elements. Identify dominant colors, lighting quality, and mood. Create authentic connections between visual elements and corresponding olfactory components.
    
    3. COMPOSITION:
       - Top Notes: List only 3-4 premium ingredient names, separated by commas
       - Heart Notes: List only 3-4 premium ingredient names, separated by commas
       - Base Notes: List only 2-3 premium ingredient names, separated by commas
       - Main Accord: A single refined fragrance family descriptor
    
    4. PERFUMER'S REVIEW: A poetic, technical description (60-80 words) using refined perfumery vocabulary. Focus on scent progression, sillage, and longevity.
    
    Format your response exactly as structured above.
    `;

    const response = await openaiClient.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "user", content: [{ type: "text", text: prompt }, { type: "image_url", image_url: { url: imageUrl } }] }
      ],
      max_tokens: 500
    });

    const aiResponse = response.choices[0].message.content;
    const nameMatch = aiResponse.match(/NAME:\s*([^\n]+)/i);
    const fragName = nameMatch ? nameMatch[1].trim() : "Untitled Fragrance";
    
    res.json({
      name: fragName,
      description: aiResponse,
      source: "ai-generated"
    });

  } catch (error) {
    console.error('Error analyzing image:', error);
    res.status(500).json({ error: 'Failed to analyze image' });
  }
});

// Export the app instance for Vercel
module.exports = app;

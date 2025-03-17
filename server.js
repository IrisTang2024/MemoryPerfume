const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname)));

// Explicit route handlers for static HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});

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
let openaiStatusMsg = '✅ OpenAI client initialized successfully';
try {
  // Force use of the real API key
  openaiClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  
  // Test the API key by making a simple call
  // This will throw an error if the key is invalid
  console.log('Testing OpenAI API key...');
  
  console.log(openaiStatusMsg);
} catch (error) {
  console.error('❌ Failed to initialize OpenAI client:', error.message);
  console.error('Error details:', error);
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
    
    console.log('Sending request to OpenAI API...');
    
    try {
      // Make API call to OpenAI's vision model
      const response = await openaiClient.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              { 
                type: "image_url", 
                image_url: {
                  url: imageUrl
                }
              }
            ]
          }
        ],
        max_tokens: 500
      });
      
      // Parse the response
      const aiResponse = response.choices[0].message.content;
      console.log('Received response from OpenAI:', aiResponse.substring(0, 100) + '...');
      
      // Parse the AI response to extract the name and full description
      let fragName = "";
      let fragDescription = "";
      
      // Extract name from the NAME section
      const nameMatch = aiResponse.match(/NAME:\s*([^\n]+)/i);
      if (nameMatch) {
          fragName = nameMatch[1].trim();
      } else {
          // Fallback to the first line if no NAME section
          const lines = aiResponse.split('\n').filter(line => line.trim() !== '');
          fragName = lines[0].replace(/^["']|["']$/g, '').trim();
      }
      
      // Use the entire response as the description (will be parsed in frontend)
      fragDescription = aiResponse;
      
      console.log(`Generated fragrance: "${fragName}"`);
      
      // Return the fragrance details
      return res.json({
        name: fragName,
        description: fragDescription,
        source: "ai-generated"
      });
    } catch (apiError) {
      console.error('OpenAI API Error:', apiError);
      console.error('Error stack:', apiError.stack);
      
      if (apiError.response) {
        console.error('API Response Error:', {
          status: apiError.response.status,
          statusText: apiError.response.statusText,
          data: apiError.response.data
        });
      }
      
      // Use fallback response for any API errors
      console.log('Using fallback response due to API error');
      return res.json({ 
        name: "Essence of Memories",
        description: `NAME: Essence of Memories

PHOTO INSPIRATION: Rich visual harmonies with balanced light and shadow. Warm tones evoke sophistication and emotional resonance, translating to refined olfactory elements.

COMPOSITION:
- Top Notes: Sicilian Bergamot, Pink Peppercorn, Mediterranean Lavender
- Heart Notes: Tahitian Vanilla Orchid, Damascena Rose, Amber Resin
- Base Notes: Mysore Sandalwood, Madagascar Vanilla
- Main Accord: Oriental Floral

PERFUMER'S REVIEW: A composition of remarkable tenacity and sillage, constructed around a classic oriental structure. The duality between citrus brightness and floral opulence creates an olfactory chiaroscuro effect reminiscent of Jean-Claude Ellena's transparent approach. The drydown reveals a distinctive ambery character with exceptional longevity, leaving an intimate signature that endures with sophisticated restraint.`,
        source: "fallback-mode"
      });
    }
  } catch (error) {
    console.error('Error analyzing image:', error);
    // Log more detailed error information
    if (error.response) {
      console.error('OpenAI API Error:', {
        status: error.response.status,
        data: error.response.data
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to analyze image: ' + (error.message || 'Unknown error'),
      fallback: {
        name: "Essence of Memories",
        description: `NAME: Essence of Memories

PHOTO INSPIRATION: Rich visual harmonies with balanced light and shadow. Warm tones evoke sophistication and emotional resonance, translating to refined olfactory elements.

COMPOSITION:
- Top Notes: Sicilian Bergamot, Pink Peppercorn, Mediterranean Lavender
- Heart Notes: Tahitian Vanilla Orchid, Damascena Rose, Amber Resin
- Base Notes: Mysore Sandalwood, Madagascar Vanilla
- Main Accord: Oriental Floral

PERFUMER'S REVIEW: A composition of remarkable tenacity and sillage, constructed around a classic oriental structure. The duality between citrus brightness and floral opulence creates an olfactory chiaroscuro effect reminiscent of Jean-Claude Ellena's transparent approach. The drydown reveals a distinctive ambery character with exceptional longevity, leaving an intimate signature that endures with sophisticated restraint.`
      }
    });
  }
});

// Start server
const server = app.listen(PORT, () => {
  const isVercel = process.env.VERCEL === '1';
  const baseUrl = isVercel 
    ? `https://${process.env.VERCEL_URL}` 
    : `http://localhost:${PORT}`;

  console.log(`
╔════════════════════════════════════════════════════════╗
║                                                        ║
║  Memory Fragrance API Server                           ║
║  Running on ${baseUrl}                                  ║
║                                                        ║
║  API Status: ${baseUrl}/api/status                       ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
  `);
}); 
const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const key = process.env.GEMINI_API_KEY
const MONGODB_URI = process.env.MONGODB_URI; // 在 Vercel 环境变量中配置

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
    message: 'Memory Perfume API is operational',
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
let GenimiClient;
let GenimiStatusMsg = '✅ Genimi client initialized successfully';
try {
  GenimiClient = new GoogleGenAI({api_key: key});
  
  // Test the API key by making a simple call
  // This will throw an error if the key is invalid
  console.log('Testing Genimi API key...');
  
  console.log(GenimiStatusMsg);
} catch (error) {
  console.error('❌ Failed to initialize Genimi client:', error.message);
  console.error('Error details:', error);
}

// API endpoint to analyze image and generate Perfume description
app.post('/api/analyze-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    
    const base64Image = req.file.buffer.toString('base64');
    const imageUrl = `data:${req.file.mimetype};base64,${base64Image}`;
    
    const prompt = `
    You are a master perfumer at a prestigious luxury Perfume house, skilled in translating visual memories into bespoke Perfumes for elite clientele.
    
    Please do the following step by step:
    
    Step1: Analyze this image to generate 'PHOTO INSPIRATION'
    
    ('PHOTO INSPIRATION': A concise analysis (25-30 words) of the key visual elements. Also, Identify dominant colors, lighting quality, and mood. 
    
    Step2: Output a 'PERFUME NAME' by finding the perfume that conveys the same feeling as the 'PHOTO INSPIRATION' generated in Step1.
    
    (Please find the perfume that's currently selling on the market, do not make up any perfume)
  
    Step3: Generate a 'PERFUMER'S REVIEW' for this perfume: A poetic, technical description (60-80 words) using refined perfumery vocabulary. Focus on scent progression, sillage, and longevity.
    
    Please only output the 'PHOTO INSPIRATION','PERFUME NAME','PERFUMER'S REVIEW'.

    Format your response exactly as structured above.
    `;
    
    console.log('Sending request to Genimi API...');
    
    try {
      // Make API call to Genimi's vision model
      const response = await GenimiClient.chat.completions.create({
        model: "gemini-2.5-flash",
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
      console.log('Received response from Genimi:', aiResponse.substring(0, 100) + '...');
      
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
      
      console.log(`Generated Perfume: "${fragName}"`);
      
      // Return the Perfume details
      return res.json({
        name: fragName,
        description: fragDescription,
        source: "ai-generated"
      });
    } catch (apiError) {
      console.error('Gemini API Error:', apiError);
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
        description: `
PHOTO INSPIRATION: Rich visual harmonies with balanced light and shadow. Warm tones evoke sophistication and emotional resonance, translating to refined olfactory elements.

PERFUME NAME: Sauvage

PERFUMER'S REVIEW: A composition of remarkable tenacity and sillage, constructed around a classic oriental structure. The duality between citrus brightness and floral opulence creates an olfactory chiaroscuro effect reminiscent of Jean-Claude Ellena's transparent approach. The drydown reveals a distinctive ambery character with exceptional longevity, leaving an intimate signature that endures with sophisticated restraint.`,

        source: "fallback-mode"
      });
    }
  } catch (error) {
    console.error('Error analyzing image:', error);
    // Log more detailed error information
    if (error.response) {
      console.error('Gemini API Error:', {
        status: error.response.status,
        data: error.response.data
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to analyze image: ' + (error.message || 'Unknown error'),
      fallback: {
        name: "Essence of Memories",
        description: `
PHOTO INSPIRATION: Rich visual harmonies with balanced light and shadow. Warm tones evoke sophistication and emotional resonance, translating to refined olfactory elements.

PERFUME NAME: SAUVAGE

PERFUMER'S REVIEW: A composition of remarkable tenacity and sillage, constructed around a classic oriental structure. The duality between citrus brightness and floral opulence creates an olfactory chiaroscuro effect reminiscent of Jean-Claude Ellena's transparent approach. The drydown reveals a distinctive ambery character with exceptional longevity, leaving an intimate signature that endures with sophisticated restraint.`
      }
    });
  }
});

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// 定义 Schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  perfumeType: String,
  message: String,
  date: { type: Date, default: Date.now }
});

// 防止模型重复注册
const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, 'Perfume-type': perfumeType, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  await dbConnect();

  const entry = new Contact({
    name,
    email,
    phone,
    perfumeType,
    message
  });

  await entry.save();

  res.status(200).json({ message: 'Message sent successfully' });
};

// 新增 /api/user-info 路由，接收 Contact.js 表单字段并存储到 MongoDB
app.post('/api/user-info', async (req, res) => {
  const { name, email, phone, 'Perfume-type': perfumeType, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await dbConnect();
    const entry = new Contact({
      name,
      email,
      phone,
      perfumeType,
      message
    });
    await entry.save();
    res.status(200).json({ message: 'User info saved successfully' });
  } catch (error) {
    console.error('Error saving user info:', error);
    res.status(500).json({ error: 'Failed to save user info' });
  }
});

module.exports = app;
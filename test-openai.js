require('dotenv').config();
const { OpenAI } = require('openai');

async function testOpenAIKey() {
  console.log('Testing OpenAI API key...');
  
  try {
    // Check if key exists
    if (!process.env.OPENAI_API_KEY) {
      console.error('Error: No API key found in environment variables');
      return;
    }
    
    // Log first and last few characters of key for debugging
    const key = process.env.OPENAI_API_KEY;
    console.log(`API Key format: ${key.substring(0, 5)}...${key.substring(key.length - 4)}`);
    
    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    
    // Make a simple models list request
    console.log('Fetching models list...');
    const response = await openai.models.list();
    
    console.log('Success! OpenAI API is working.');
    console.log(`Found ${response.data.length} models available.`);
    console.log('First few models:');
    response.data.slice(0, 3).forEach(model => {
      console.log(`- ${model.id}`);
    });
    
  } catch (error) {
    console.error('Error testing OpenAI API:');
    console.error(error);
    
    if (error.response) {
      console.error('API response error:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      });
    }
  }
}

testOpenAIKey(); 
import os
from google import genai
from dotenv import load_dotenv

load_dotenv()
# Get the API key from environment variable
api_key = os.getenv('GEMINI_API_KEY')
if not api_key:
    raise ValueError("Please set the GEMINI_API_KEY environment variable")

# Initialize the client with the API key
client = genai.Client(api_key=api_key)

response = client.models.generate_content(
    model="gemini-2.5-flash", contents="Explain how AI works in a few words"
)
print(response.text)
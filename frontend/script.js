document.addEventListener("DOMContentLoaded", function() {
    // Apply elegant page animations
    animateElements();
    
    // Check server status on page load to verify connection
    checkServerStatus();
    
    // Navigation Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Add elegant slide animation
            if (navMenu.classList.contains('active')) {
                const navItems = document.querySelectorAll('.nav-item');
                navItems.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(20px)';
                    setTimeout(() => {
                        item.style.transition = 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1.4)';
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 50 + (index * 80));
                });
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = navMenu.contains(event.target) || navToggle.contains(event.target);
            
            if (!isClickInside && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    }
    
    // Add subtle scroll animations to navigation
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.top-nav');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(44, 33, 68, 0.98)';
            nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
        } else {
            nav.style.background = 'rgba(44, 33, 68, 0.95)';
            nav.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // File selection preview
    const fileInput = document.getElementById('imageUpload');
    const dropArea = document.querySelector('.file-drop-area');
    const fileNameDisplay = document.getElementById('file-name');
    
    fileInput.addEventListener('change', function() {
        if (fileInput.files.length > 0) {
            fileNameDisplay.textContent = fileInput.files[0].name;
            dropArea.style.borderColor = '#d4af37';
            dropArea.style.backgroundColor = '#f8f5ff';
            
            // Subtle gold shimmer effect on successful upload
            dropArea.classList.add('gold-shimmer');
            setTimeout(() => {
                dropArea.classList.remove('gold-shimmer');
            }, 2000);
        }
    });
    
    // Drag and drop functionality
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        dropArea.style.borderColor = '#d4af37';
        dropArea.style.backgroundColor = '#f8f5ff';
        dropArea.style.transform = 'scale(1.02)';
        dropArea.style.boxShadow = '0 5px 15px rgba(212, 175, 55, 0.2)';
    }
    
    function unhighlight() {
        dropArea.style.borderColor = 'rgba(44, 33, 68, 0.3)';
        dropArea.style.backgroundColor = '#f8f5ff';
        dropArea.style.transform = 'scale(1)';
        dropArea.style.boxShadow = 'none';
    }
    
    dropArea.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length > 0) {
            fileInput.files = files;
            fileNameDisplay.textContent = files[0].name;
            
            // Subtle gold shimmer effect on successful upload
            dropArea.classList.add('gold-shimmer');
            setTimeout(() => {
                dropArea.classList.remove('gold-shimmer');
            }, 2000);
        }
    }
    
    // Elegant hover animations for buttons and cards
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.background = `radial-gradient(circle at ${x}px ${y}px, #3d2d5e, #2c2144)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.background = 'var(--dark-gradient)';
        });
    });
    
    // Initialize testimonials section animations
    initTestimonialsAnimations();
    
    // Direct OpenAI client setup (only for demo/fallback)
    setupDirectOpenAI();
});

// Global variables
let serverAvailable = false;
let directOpenAIClient = null;

// Animate luxury elements with subtle, refined animations
function animateElements() {
    // Subtle fade in for header elements
    const header = document.querySelector('header');
    const headerElements = header.querySelectorAll('h1, p');
    
    headerElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 300 + (index * 200));
    });
    
    // Elegant reveal for feature cards
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            feature.style.transition = 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
            feature.style.opacity = '1';
            feature.style.transform = 'translateY(0)';
        }, 600 + (index * 200));
    });
    
    // Subtle reveal for cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        
        setTimeout(() => {
            card.style.transition = 'all 1s cubic-bezier(0.25, 0.1, 0.25, 1)';
            card.style.opacity = '1';
        }, 400 + (index * 300));
    });
}

// Function to check if the server is running
async function checkServerStatus() {
    updateAIStatus('checking');
    
    try {
        const response = await fetch('/api/status');
        if (response.ok) {
            const data = await response.json();
            console.log('Server status:', data);
            serverAvailable = true;
            updateAIStatus('connected');
        } else {
            console.error('Server status check failed. Backend may not be running.');
            showNotification("Server connection issue. Will use direct AI processing as fallback.", "warning");
            serverAvailable = false;
            updateAIStatus('fallback');
        }
    } catch (error) {
        console.error('Server connection error:', error);
        showNotification("Cannot connect to server. Using direct processing mode.", "warning");
        serverAvailable = false;
        updateAIStatus('fallback');
    }
}

// Function to update AI status indicator
function updateAIStatus(status) {
    const statusIndicator = document.getElementById('ai-status-indicator');
    if (!statusIndicator) return;
    
    const statusDot = statusIndicator.querySelector('.status-dot');
    const statusText = statusIndicator.querySelector('.status-text');
    
    // Remove all previous status classes
    statusIndicator.classList.remove('status-connected', 'status-fallback', 'status-error', 'status-checking', 'status-processing', 'status-processing-local');
    
    // Set new status
    switch (status) {
        case 'connected':
            statusIndicator.classList.add('status-connected');
            statusDot.style.backgroundColor = '#4CAF50';
            statusText.textContent = 'AI Service: Connected';
            break;
        case 'fallback':
            statusIndicator.classList.add('status-fallback');
            statusDot.style.backgroundColor = '#FF9800';
            statusText.textContent = 'AI Service: Local Processing';
            break;
        case 'error':
            statusIndicator.classList.add('status-error');
            statusDot.style.backgroundColor = '#F44336';
            statusText.textContent = 'AI Service: Disconnected';
            break;
        case 'processing':
            statusIndicator.classList.add('status-processing');
            statusDot.style.backgroundColor = '#9C27B0';
            statusText.textContent = 'AI Service: Analyzing Image';
            break;
        case 'processing-local':
            statusIndicator.classList.add('status-processing-local');
            statusDot.style.backgroundColor = '#FF9800';
            statusText.textContent = 'AI Service: Local Analysis';
            break;
        case 'checking':
        default:
            statusIndicator.classList.add('status-checking');
            statusDot.style.backgroundColor = '#2196F3';
            statusText.textContent = 'AI Service: Checking Connection...';
            break;
    }
}

// Setup direct OpenAI client for fallback usage
function setupDirectOpenAI() {
    try {
        // This is only for demonstration purposes
        // In a production app, you would NEVER put API keys in client-side code
        directOpenAIClient = new OpenAI({
            apiKey: 'DEMO_MODE_ONLY', // This won't work, just for UI demonstration
            dangerouslyAllowBrowser: true
        });
        console.log('Direct OpenAI client setup (demo mode)');
    } catch (error) {
        console.error('Could not initialize direct OpenAI client:', error);
    }
}

// Function to handle the image upload and processing
async function uploadImage() {
    const input = document.getElementById('imageUpload');
    const loading = document.querySelector('.loading');
    const results = document.querySelector('.results');
    const uploadSection = document.querySelector('.upload-section');
    
    if (input.files.length > 0) {
        // Hide previous results if any
        if (results.style.display === 'block') {
            results.style.opacity = '0';
            setTimeout(() => {
                results.style.display = 'none';
                processUpload();
            }, 500);
        } else {
            processUpload();
        }
        
        async function processUpload() {
            // Show loading indicator with elegant fade in
            loading.style.display = 'block';
            loading.style.opacity = '0';
            
            setTimeout(() => {
                loading.style.opacity = '1';
                loading.style.transition = 'opacity 0.8s ease';
            }, 10);
            
            // Update the loading text based on connection status
            const loadingText = loading.querySelector('p');
            if (loadingText) {
                if (serverAvailable) {
                    loadingText.textContent = "AI analyzing your memory through our secure server...";
                    updateAIStatus('processing');
                } else {
                    loadingText.textContent = "Analyzing your memory using local processing...";
                    updateAIStatus('processing-local');
                }
            }
            
            // Subtle background shimmer during processing
            uploadSection.classList.add('processing');
            
            try {
                // Read the uploaded image
                const file = input.files[0];
                const imageData = await readFileAsDataURL(file);
                
                // Connect to OpenAI API
                const PerfumeDescription = await analyzeImageWithAI(imageData, file.name);
                
                // Update the Perfume description
                updatePerfumeDetails(PerfumeDescription);
                
                // Hide loading with elegant fade out
                loading.style.opacity = '0';
                
                setTimeout(() => {
                    loading.style.display = 'none';
                    uploadSection.classList.remove('processing');
                    
                    // Show results with elegant fade in
                    results.style.display = 'block';
                    results.style.opacity = '0';
                    
                    setTimeout(() => {
                        results.style.opacity = '1';
                        results.style.transition = 'opacity 1s ease';
                        
                        // Animate the perfume card with refined animation - LIMITED TO 1 PULSE
                        const perfumeCard = document.querySelector('.perfume-card');
                        perfumeCard.style.animation = 'pulse 3s ease-in-out 1 alternate';
                        
                        // Remove animation after it completes (1 pulse)
                        setTimeout(() => {
                            perfumeCard.style.animation = 'none';
                        }, 3000); // 3s per pulse × 1 pulse = 3s
                        
                        // Add subtle gold accent animation
                        const perfumeImg = document.querySelector('.perfume-img');
                        perfumeImg.classList.add('gold-pulse');
                        
                        // Remove gold pulse animation after 3 seconds as well
                        setTimeout(() => {
                            perfumeImg.classList.remove('gold-pulse');
                        }, 3000);
                        
                        // Show success notification if not using fallback
                        if (!PerfumeDescription.isError && !PerfumeDescription.directMode) {
                            showNotification("Your bespoke Perfume has been created successfully.", "success");
                        } else if (PerfumeDescription.directMode) {
                            showNotification("Your Perfume has been created using local AI simulation.", "info");
                        }
                        
                        // Restore AI status indicator
                        if (serverAvailable) {
                            updateAIStatus('connected');
                        } else {
                            updateAIStatus('fallback');
                        }
                    }, 50);
                }, 800);
                
            } catch (error) {
                console.error("Error processing image:", error);
                showNotification("We encountered an issue creating your Perfume. Please try again.", "error");
                
                loading.style.opacity = '0';
                setTimeout(() => {
                    loading.style.display = 'none';
                    uploadSection.classList.remove('processing');
                    
                    // Restore AI status indicator
                    if (serverAvailable) {
                        updateAIStatus('connected');
                    } else {
                        updateAIStatus('fallback');
                    }
                }, 500);
            }
        }
    } else {
        // Elegant notification
        showNotification("Please select an image to create your bespoke Perfume", "info");
    }
}

// Function to read file as Data URL for AI processing
function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Function to analyze image with OpenAI API
async function analyzeImageWithAI(imageData, imageName) {
    try {
        console.log("Starting image analysis process for:", imageName);
        
        // Check if server is available first
        if (serverAvailable) {
            // Try server-based processing
            try {
                return await processImageWithServer(imageData, imageName);
            } catch (serverError) {
                console.error("Server processing failed:", serverError);
                // Fall back to direct processing if server fails
                showNotification("Server processing failed. Trying direct processing.", "warning");
                return await processImageDirectly(imageData, imageName);
            }
        } else {
            // Use direct processing if server is known to be unavailable
            return await processImageDirectly(imageData, imageName);
        }
    } catch (error) {
        console.error("Error with image analysis:", error);
        
        // Show error notification
        showNotification("Unable to analyze your photo. Using sample Perfume.", "error");
        
        // Fallback to predefined descriptions if all methods fail
        return {
            name: "Essence of Memories",
            description: "A bespoke blend of precious amber, vanilla orchid, and warm sandalwood that captures the emotional depth of your treasured moment. Complemented by notes of bergamot and lavender to evoke the sensory richness of your unique memory.",
            isError: true
        };
    }
}

// Process image using the server API
async function processImageWithServer(imageData, imageName) {
    console.log("Processing with server API");
    
    // Create form data to send to the backend
    const formData = new FormData();
    
    // Convert dataURL to blob
    const blob = await dataURLtoBlob(imageData);
    formData.append('image', blob, imageName);
    
    console.log(`Sending image to server: ${imageName} (${Math.round(blob.size / 1024)} KB)`);
    
    // First check if server is accessible
    try {
        const statusCheck = await fetch('/api/status', { method: 'GET' });
        if (!statusCheck.ok) {
            throw new Error('Server is not responding properly');
        }
    } catch (statusError) {
        console.error("Server status check failed:", statusError);
        throw new Error('Cannot reach the server');
    }
    
    // Send to the backend API endpoint
    const response = await fetch('/api/analyze-image', {
        method: 'POST',
        body: formData
    });
    
    console.log('Server response status:', response.status);
    
    const responseData = await response.json();
    
    if (!response.ok) {
        console.error("API response error:", responseData);
        
        // Return fallback if provided by the backend
        if (responseData.fallback) {
            console.log("Using fallback Perfume data");
            return {
                ...responseData.fallback,
                isError: true
            };
        }
        
        throw new Error(`API response error: ${response.status} - ${responseData.error || 'Unknown error'}`);
    }
    
    // Successful server processing
    console.log('Image successfully analyzed, Perfume generated:', responseData.name);
    return responseData;
}

// Process image directly using OpenAI in browser (demo only)
async function processImageDirectly(imageData, imageName) {
    console.log("Attempting direct processing (demo mode)");
    
    if (!directOpenAIClient) {
        console.error("Direct OpenAI client not available");
        throw new Error("Direct processing not available");
    }
    
    // In real implementation, this would make a direct API call
    // For demo purposes, we'll use a simulated response
    console.log("Simulating AI analysis in direct mode");
    
    // Simulate processing delay to represent AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Demo: Generate a different response based on image characteristics
    // In reality, this would be an actual AI analysis of the image
    let name, description;
    
    // Get color information from the image to simulate "analysis"
    const colorInfo = await analyzeImageColors(imageData);
    console.log("Image color analysis:", colorInfo);
    
    // Simulate "intelligence" by using color information
    if (colorInfo.isDark) {
        name = "Midnight Velvet";
        description = `NAME: Midnight Velvet

PHOTO INSPIRATION: The deep shadows and mysterious tones of this image evoke an atmosphere of contemplative intimacy. The darkness suggests layers of complexity waiting to be discovered, translating into a Perfume that rewards patience and close exploration.

COMPOSITION:
- Top Notes: Black Pepper, Cardamom, Sicilian Bergamot
- Heart Notes: Black Orchid, Dark Vanilla Bean, Leather Accord
- Base Notes: Aged Oud, Smoky Amber
- Main Accord: Oriental Woody

PERFUMER'S REVIEW: Like secrets whispered in the dark, this Perfume unfurls with a peppery intensity that gradually softens into mysterious floral dimensions. The heart beats with the exotic rhythm of black orchid and smoldering leather, creating an opulent narrative of depth and character. In its final moments, the composition settles into a velvet embrace of aged oud and amber, leaving a lingering impression of midnight revelations and unspoken desires.`;
    } else if (colorInfo.isWarm) {
        name = "Golden Memoir";
        description = `NAME: Golden Memoir

PHOTO INSPIRATION: Bathed in the warm glow of golden hour light, this image captures a moment of nostalgic reflection and joy. The amber tones and soft highlights create a visual warmth that translates perfectly into an olfactory experience of comfort and remembered happiness.

COMPOSITION:
- Top Notes: Sicilian Citrus, Sun-Ripened Mandarin, Ginger
- Heart Notes: Amber, Saffron, Cardamom, Jasmine Sambac
- Base Notes: Cedarwood, Caramel Accord
- Main Accord: Amber Gourmand

PERFUMER'S REVIEW: Like sunlight captured in a bottle, this composition begins with a bright cascade of citrus notes that dance like memories coming into focus. The heart unfurls with precious amber and exotic spice, reminiscent of treasured moments preserved in time. As it settles on the skin, sweet whispers of caramel and cedar create a long-lasting signature that tells the story of joyful moments - forever golden, forever preserved in the delicate architecture of scent.`;
    } else {
        name = "Azure Reflection";
        description = `NAME: Azure Reflection

PHOTO INSPIRATION: The cool tones and ethereal quality of this image evoke the tranquility of water reflecting clear skies. The composition suggests both depth and transparency, creating a visual serenity that translates into a Perfume that feels both grounding and uplifting.

COMPOSITION:
- Top Notes: Bergamot, Sea Salt, Acquatic Notes, Coriander
- Heart Notes: Water Lily, Lavender, Transparent Rose, Marine Accord
- Base Notes: White Musk, Driftwood
- Main Accord: Fresh Aquatic

PERFUMER'S REVIEW: Like light dancing on water, this composition opens with a crystalline clarity of crisp notes that immediately transport the wearer to shores of possibility. The heart reveals a transparent bouquet of delicate florals suspended in a marine accord, creating the sensation of memories floating just beneath the surface. As it settles into the skin, clean musk and weathered driftwood create a foundation as reassuring as the eternal meeting of sky and sea - a horizon of tranquility captured in olfactory form.`;
    }
    
    return {
        name: name,
        description: description,
        directMode: true
    };
}

// Simple image color analysis to simulate AI processing
function analyzeImageColors(dataUrl) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            
            // Sample a few pixels from the image
            const pixelData = ctx.getImageData(0, 0, img.width, img.height).data;
            
            let totalR = 0, totalG = 0, totalB = 0;
            const sampleSize = Math.min(pixelData.length / 4, 1000); // Limit samples
            const step = Math.floor(pixelData.length / 4 / sampleSize);
            
            for (let i = 0; i < pixelData.length; i += step * 4) {
                totalR += pixelData[i];
                totalG += pixelData[i + 1];
                totalB += pixelData[i + 2];
            }
            
            const avgR = totalR / sampleSize;
            const avgG = totalG / sampleSize;
            const avgB = totalB / sampleSize;
            
            // Calculate brightness and determine if image is dark
            const brightness = (avgR + avgG + avgB) / 3;
            const isDark = brightness < 128;
            
            // Determine if colors are warm
            const isWarm = avgR > avgB;
            
            resolve({
                avgColor: `rgb(${Math.round(avgR)}, ${Math.round(avgG)}, ${Math.round(avgB)})`,
                brightness: brightness,
                isDark: isDark,
                isWarm: isWarm
            });
        };
        img.src = dataUrl;
    });
}

// Helper function to convert dataURL to Blob for form upload
function dataURLtoBlob(dataURL) {
    return new Promise((resolve) => {
        const arr = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        resolve(new Blob([u8arr], { type: mime }));
    });
}

// Function to update the Perfume card with AI-generated content
function updatePerfumeDetails(Perfume) {
    const nameElement = document.querySelector('.perfume-name');
    const descElement = document.querySelector('.perfume-desc');
    
    if (nameElement && descElement) {
        // Extract information from the response
        let PerfumeName = Perfume.name;
        let photoInspiration = "";
        let perfumeName = "";
        let topNotes = "";
        let heartNotes = "";
        let baseNotes = "";
        let mainAccord = "";
        let perfumerReview = "";
        
        // Parse the structured description 
        const description = Perfume.description;
        
        // Find Photo Inspiration section - improved regex to ensure we stop at COMPOSITION section
        const photoInspirationMatch = description.match(/PHOTO INSPIRATION:\s*(.*?)(?=\s*PERFUME NAME:|$)/si);
        if (photoInspirationMatch) {
            photoInspiration = photoInspirationMatch[1].trim();
        }
        
        // Find Composition section and its components
        const PerfumeNameMatch = description.match(/PERFUME NAME:\s*([^]*)(?=\s*PERFUMER'S REVIEW:|$)/i);
        if (PerfumeNameMatch) {
            perfumeName = PerfumeNameMatch[1].trim();
        }
        
        // Find Perfumer's Review section
        const reviewMatch = description.match(/PERFUMER'S REVIEW:\s*([^]*)/i);
        if (reviewMatch) {
            perfumerReview = reviewMatch[1].trim();
        }
        
        // If no structured format is found, use the whole description
        if (!photoInspiration && !perfumeName && !perfumerReview) {
            perfumerReview = description;
        }
        
        // Update the UI with the extracted information
        nameElement.textContent = PerfumeName;
        
        // Clear previous content
        const perfumeCard = document.querySelector('.perfume-card');
        const perfumeDetails = perfumeCard.querySelector('.perfume-details');
        
        // Recreate the content to ensure proper structure
        perfumeDetails.innerHTML = `
            <div class="perfume-name">${PerfumeName}</div>
            
            ${photoInspiration ? `
            <div class="photo-inspiration">
                <h4>Photo Inspiration</h4>
                <p>${photoInspiration}</p>
            </div>
            ` : ''}
            
            ${perfumeName ? `
                <div class="perfume-name">
                    <h4>Perfume Name</h4>
                    <p>${perfumeName}</p>
                </div>
                ` : ''}
            
            ${perfumerReview ? `
            <div class="perfume-review">
                <h4>Perfumer's Review</h4>
                <p class="perfume-desc">${perfumerReview}</p>
            </div>
            ` : ''}
            
            <div class="perfume-signature">
                <span class="signature-line"></span>
                <span class="signature-text">Memory Perfume</span>
                <span class="signature-line"></span>
            </div>
        `;
        
        // Add visual indicator if using fallback due to error
        if (Perfume.isError) {
            nameElement.classList.add('fallback-data');
            
            // Add a small note about the fallback
            const fallbackNote = document.createElement('div');
            fallbackNote.className = 'fallback-note';
            fallbackNote.innerHTML = '<i class="fas fa-info-circle"></i> Using sample Perfume (AI connection unavailable)';
            fallbackNote.style.textAlign = 'left';
            
            if (!perfumeCard.querySelector('.fallback-note')) {
                perfumeCard.appendChild(fallbackNote);
            }
        } else {
            // Remove any existing fallback note
            const existingNote = document.querySelector('.fallback-note');
            if (existingNote) {
                existingNote.remove();
            }
        }
        
        // Add elegant animation to the perfume card
        perfumeCard.classList.add('show-card');
        
        // Ensure perfume image is aligned left
        const perfumeImg = document.querySelector('.perfume-img');
        if (perfumeImg) {
            perfumeImg.style.margin = '0 0 20px 0';
        }
        
        // Ensure results heading is left-aligned
        const resultsHeading = document.querySelector('.results h3');
        if (resultsHeading) {
            resultsHeading.style.textAlign = 'left';
        }
    }
}

// Enhanced notification function with type support
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `luxury-notification ${type}`;
    
    let icon = 'info-circle';
    if (type === 'error') icon = 'exclamation-circle';
    if (type === 'success') icon = 'check-circle';
    
    notification.innerHTML = `<i class="fas fa-${icon}"></i><p>${message}</p>`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 5000);
}

// Add this to your CSS via JavaScript to avoid editing the styles.css file again
const styleElement = document.createElement('style');
styleElement.textContent = `
    .gold-shimmer {
        position: relative;
        overflow: hidden;
    }
    
    .gold-shimmer::after {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(
            to right, 
            rgba(212, 175, 55, 0) 0%, 
            rgba(212, 175, 55, 0.1) 50%, 
            rgba(212, 175, 55, 0) 100%
        );
        transform: rotate(30deg);
        animation: shimmerEffect 2s ease-in-out infinite;
    }
    
    @keyframes shimmerEffect {
        0% { transform: translateX(-100%) rotate(30deg); }
        100% { transform: translateX(100%) rotate(30deg); }
    }
    
    .gold-pulse {
        animation: goldPulse 3s 1 alternate ease-in-out;
    }
    
    @keyframes goldPulse {
        0% { box-shadow: 0 0 10px rgba(212, 175, 55, 0.2); }
        100% { box-shadow: 0 0 25px rgba(212, 175, 55, 0.6); }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05); }
        100% { transform: scale(1.02); box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1); }
    }
    
    .processing {
        position: relative;
        overflow: hidden;
    }
    
    .processing::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(to right, transparent, #d4af37, transparent);
        animation: processingShimmer 2s infinite linear;
    }
    
    @keyframes processingShimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
    
    .luxury-notification {
        position: fixed;
        top: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        background: var(--dark-gradient);
        color: white;
        padding: 15px 30px;
        border-radius: 50px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        opacity: 0;
        transition: all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
        z-index: 1000;
        border: 1px solid rgba(212, 175, 55, 0.3);
    }
    
    .luxury-notification p {
        margin: 0;
        font-family: 'Montserrat', sans-serif;
        font-weight: 300;
        font-size: 0.95rem;
        letter-spacing: 0.5px;
    }
    
    .luxury-notification.error {
        background: linear-gradient(135deg, #8B0000, #5A0000);
        border: 1px solid rgba(255, 200, 200, 0.3);
    }
    
    .luxury-notification.success {
        background: linear-gradient(135deg, #006400, #004D00);
        border: 1px solid rgba(200, 255, 200, 0.3);
    }
    
    .luxury-notification i {
        margin-right: 10px;
        font-size: 1.1rem;
    }
    
    .fallback-data {
        color: #777 !important;
    }
    
    .fallback-note {
        font-size: 0.8rem;
        color: #777;
        margin-top: 10px;
        font-style: italic;
        text-align: left;
        font-family: 'Montserrat', sans-serif;
    }
    
    /* Enhanced professional perfume card styles */
    .perfume-card {
        position: relative;
        background: linear-gradient(to right, #ffffff, #f9f7ff);
        border: 1px solid rgba(212, 175, 55, 0.3);
        border-radius: 12px;
        padding: 30px;
        margin-top: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        overflow: hidden;
        transition: all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
        transform: translateY(30px);
        opacity: 0;
    }
    
    .perfume-card.show-card {
        transform: translateY(0);
        opacity: 1;
    }
    
    .perfume-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23d4af37' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
        opacity: 0.5;
        z-index: 0;
    }
    
    .perfume-img {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, #f8f5ff, #eee9ff);
        border-radius: 50%;
        margin: 0 0 20px 0;
        position: relative;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(212, 175, 55, 0.3);
        z-index: 1;
    }
    
    .perfume-img i {
        font-size: 32px;
        color: #d4af37;
    }
    
    .perfume-name {
        font-family: 'Playfair Display', serif;
        font-size: 2rem;
        font-weight: 700;
        color: #2c2144;
        text-align: left;
        margin-bottom: 15px;
        letter-spacing: 1px;
        position: relative;
        z-index: 1;
    }
    
    .perfume-name::after {
        content: '';
        display: block;
        width: 60px;
        height: 2px;
        background: rgba(212, 175, 55, 0.7);
        margin: 10px 0 0 0;
    }
    
    .Perfume-notes {
        margin: 20px 0;
        position: relative;
        z-index: 1;
    }
    
    .note-category {
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    
    .note-label {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.9rem;
        color: #2c2144;
        margin-bottom: 5px;
        position: relative;
        text-align: left;
        width: 100%;
    }
    
    .note-label strong {
        color: #2c2144;
        letter-spacing: 0.5px;
    }
    
    .note-separator {
        display: block;
        width: 100%;
        height: 1px;
        background: linear-gradient(to right, rgba(212, 175, 55, 0.3), transparent);
        margin: 5px 0;
    }
    
    .perfume-desc {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.95rem;
        color: #555;
        line-height: 1.7;
        text-align: left;
        margin: 20px 0;
        position: relative;
        z-index: 1;
        font-weight: 300;
        letter-spacing: 0.3px;
    }
    
    .perfume-signature {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-top: 25px;
        position: relative;
        z-index: 1;
    }
    
    .signature-line {
        height: 1px;
        flex-grow: 1;
        background: linear-gradient(to right, rgba(212, 175, 55, 0.3), transparent);
    }
    
    .signature-text {
        font-family: 'Playfair Display', serif;
        font-size: 0.9rem;
        color: #d4af37;
        margin: 0 15px 0 0;
        font-style: italic;
        letter-spacing: 1px;
    }
    
    @media (max-width: 768px) {
        .perfume-card {
            padding: 20px 15px;
        }
        
        .perfume-name {
            font-size: 1.6rem;
        }
        
        .note-label {
            font-size: 0.8rem;
        }
        
        .perfume-desc {
            font-size: 0.9rem;
            line-height: 1.6;
        }
    }
    
    /* New sections styling */
    .photo-inspiration {
        margin: 20px 0;
        position: relative;
        z-index: 1;
        border-left: 3px solid rgba(212, 175, 55, 0.7);
        padding-left: 15px;
        background-color: rgba(212, 175, 55, 0.03);
        border-radius: 0 8px 8px 0;
        padding: 12px 15px 12px 18px;
        text-align: left;
    }
    
    .photo-inspiration h4 {
        font-family: 'Playfair Display', serif;
        font-size: 1.1rem;
        margin: 0 0 8px 0;
        color: #2c2144;
        letter-spacing: 0.5px;
        text-align: left;
    }
    
    .photo-inspiration p {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.95rem;
        margin: 0;
        line-height: 1.7;
        color: #444;
        font-style: italic;
        text-align: left;
    }
    
    .main-accord {
        margin: 20px 0 15px;
    }
    
    .main-accord .note-label {
        font-size: 1rem;
    }
    
    .main-accord .note-separator {
        background: linear-gradient(to right, rgba(212, 175, 55, 0.6), transparent);
        height: 2px;
    }
    
    .perfume-review {
        margin: 25px 0 15px;
        text-align: left;
        position: relative;
    }
    
    .perfume-review h4 {
        font-family: 'Playfair Display', serif;
        font-size: 1.1rem;
        color: #2c2144;
        margin: 0 0 12px 0;
        letter-spacing: 0.5px;
        position: relative;
        display: inline-block;
        text-align: left;
    }
    
    .perfume-review h4::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 80%;
        height: 1px;
        background: linear-gradient(to right, rgba(212, 175, 55, 0.4), transparent);
    }
    
    .perfume-review .perfume-desc {
        margin-top: 15px;
        font-size: 0.95rem;
        line-height: 1.8;
        color: #333;
        font-weight: 300;
        letter-spacing: 0.3px;
        font-family: 'Montserrat', sans-serif;
        text-align: left;
    }
    
    /* Left-aligned result header */
    .results h3 {
        text-align: left;
    }
`;

document.head.appendChild(styleElement);

// Function to handle animations for the testimonials section
function initTestimonialsAnimations() {
    // Intersection Observer for elegant scroll-based animations
    const testimonialObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateTestimonialCard(entry.target);
                    testimonialObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );
    
    // Observe all memory cards
    document.querySelectorAll('.memory-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        testimonialObserver.observe(card);
    });
    
    // CTA container animation
    const ctaContainer = document.querySelector('.cta-container');
    if (ctaContainer) {
        const ctaObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            ctaContainer.style.transition = 'all 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)';
                            ctaContainer.style.opacity = '1';
                            ctaContainer.style.transform = 'translateY(0)';
                        }, 300);
                        ctaObserver.unobserve(ctaContainer);
                    }
                });
            },
            { threshold: 0.2 }
        );
        
        ctaContainer.style.opacity = '0';
        ctaContainer.style.transform = 'translateY(30px)';
        ctaObserver.observe(ctaContainer);
    }
    
    // Testimonials header animation
    const testimonialsHeader = document.querySelector('.testimonials-header');
    if (testimonialsHeader) {
        const headerObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        testimonialsHeader.style.transition = 'all 1s cubic-bezier(0.25, 0.1, 0.25, 1)';
                        testimonialsHeader.style.opacity = '1';
                        testimonialsHeader.style.transform = 'translateY(0)';
                        headerObserver.unobserve(testimonialsHeader);
                    }
                });
            },
            { threshold: 0.5 }
        );
        
        testimonialsHeader.style.opacity = '0';
        testimonialsHeader.style.transform = 'translateY(20px)';
        headerObserver.observe(testimonialsHeader);
    }
    
    // Handle scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const firstCard = document.querySelector('.memory-card');
            if (firstCard) {
                const offset = 80; // Account for fixed nav
                const cardPosition = firstCard.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: cardPosition,
                    behavior: 'smooth'
                });
            }
        });
        
        // Hide scroll indicator when user scrolls past the first testimonial
        window.addEventListener('scroll', () => {
            const firstCard = document.querySelector('.memory-card');
            if (firstCard) {
                const cardTop = firstCard.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (cardTop < windowHeight * 0.8) {
                    scrollIndicator.style.opacity = '0';
                    scrollIndicator.style.pointerEvents = 'none';
                } else {
                    scrollIndicator.style.opacity = '0.7';
                    scrollIndicator.style.pointerEvents = 'auto';
                }
            }
        });
    }
    
    // Add hover effects to Perfume bottles
    document.querySelectorAll('.memory-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const bottle = this.querySelector('.Perfume-bottle');
            if (bottle) {
                bottle.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.4)';
                bottle.style.transform = 'translateY(-15px)';
                bottle.style.boxShadow = '0 20px 30px rgba(0, 0, 0, 0.15)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const bottle = this.querySelector('.Perfume-bottle');
            if (bottle) {
                bottle.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
                bottle.style.transform = 'translateY(0)';
                bottle.style.boxShadow = 'var(--box-shadow)';
            }
        });
    });
    
    // Add subtle parallax effect to photos on mouse movement
    const memoryPhotos = document.querySelectorAll('.memory-photo');
    memoryPhotos.forEach(photo => {
        photo.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            this.querySelector('img').style.transform = `scale(1.03) translate(${x * 10}px, ${y * 10}px)`;
        });
        
        photo.addEventListener('mouseleave', function() {
            this.querySelector('img').style.transform = 'scale(1)';
        });
    });
}

// Function to animate individual testimonial cards
function animateTestimonialCard(card) {
    const delay = card.classList.contains('reverse') ? 200 : 0;
    
    setTimeout(() => {
        card.style.transition = 'all 1s cubic-bezier(0.25, 0.1, 0.25, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        
        // Animate elements inside the card
        setTimeout(() => {
            const photo = card.querySelector('.memory-photo img');
            if (photo) {
                photo.style.transition = 'transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1.2)';
                photo.style.transform = 'scale(1.03)';
                
                setTimeout(() => {
                    photo.style.transform = 'scale(1)';
                }, 1200);
            }
            
            // Animate the Perfume bottle with a slight delay
            const bottle = card.querySelector('.Perfume-bottle');
            if (bottle) {
                bottle.style.opacity = '0';
                bottle.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    bottle.style.transition = 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1.4)';
                    bottle.style.opacity = '1';
                    bottle.style.transform = 'translateY(0)';
                }, 400);
            }
        }, 300);
    }, delay);
}

// Add AI status indicator styling
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .ai-status-container {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
        font-family: 'Montserrat', sans-serif;
    }
    
    .ai-status {
        display: inline-flex;
        align-items: center;
        padding: 5px 12px;
        border-radius: 20px;
        background-color: rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;
    }
    
    .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 8px;
        transition: background-color 0.3s ease;
    }
    
    .status-text {
        font-size: 0.8rem;
        letter-spacing: 0.5px;
        color: #555;
        font-weight: 500;
    }
    
    .status-connected .status-dot {
        box-shadow: 0 0 8px rgba(76, 175, 80, 0.5);
    }
    
    .status-fallback .status-dot {
        box-shadow: 0 0 8px rgba(255, 152, 0, 0.5);
    }
    
    .status-error .status-dot {
        box-shadow: 0 0 8px rgba(244, 67, 54, 0.5);
    }
    
    .status-checking .status-dot {
        animation: pulse 1.5s infinite;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.5); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
    }
`;

document.head.appendChild(additionalStyles);

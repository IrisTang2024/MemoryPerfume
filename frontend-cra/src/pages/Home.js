import React from "react";

export default function Home() {
  return (
    <>
      <nav className="top-nav">
        <div className="container nav-container">
          <div className="nav-logo">
            <a href="/"><span className="logo-icon"><i className="fas fa-spray-can"></i></span>Memory Perfume</a>
          </div>
          <div className="nav-toggle">
            <i className="fas fa-bars"></i>
          </div>
          <ul className="nav-menu">
            <li className="nav-item"><a href="/" className="active">Home</a></li>
            <li className="nav-item"><a href="/about">About</a></li>
            <li className="nav-item"><a href="/contact" className="nav-btn">Contact Us</a></li>
          </ul>
        </div>
      </nav>
      <header>
        <div className="container">
          <h1>Memory Perfume</h1>
          <p>Discover the essence of your memories through our bespoke Perfume collection</p>
        </div>
      </header>
      <div className="container main-content">
        {/* Introduction Section */}
        <section className="intro-section">
          <div className="intro-content">
            <div className="intro-text">
              <h2>Transform Cherished Moments into <span className="accent-text">Exquisite Perfumes</span></h2>
              <p className="intro-description">
                Our innovative technology translates the visual essence of your most precious memories 
                into bespoke Perfumes that evoke the same emotional response. Every image carries its 
                own distinct story—a sunset by the sea, a cherished family moment, or a peaceful forest retreat.
              </p>
              <p className="intro-feature">
                <span className="feature-dot"><i className="fas fa-circle"></i></span>
                Proprietary AI analyzes visual elements and emotional undertones
              </p>
              <p className="intro-feature">
                <span className="feature-dot"><i className="fas fa-circle"></i></span>
                Master perfumers interpret data into exquisite scent compositions
              </p>
              <p className="intro-feature">
                <span className="feature-dot"><i className="fas fa-circle"></i></span>
                Receive your bespoke Perfume created specifically for your memory
              </p>
            </div>
            <div className="intro-images">
              <div className="image-gallery">
                <div className="gallery-main">
                  <div className="image-frame">
                    <img src="/images/family.jpg" alt="Beach vacation in Hawaii" className="main-image" />
                    <div className="image-caption">Your memories transformed</div>
                  </div>
                </div>
                <div className="gallery-thumbs">
                  <div className="thumb">
                    <img src="/images/beach.jpg" alt="Beach memory" />
                    <div className="thumb-overlay">
                      <div className="scent-name">Ocean Breeze</div>
                    </div>
                  </div>
                  <div className="thumb">
                    <img src="/images/forest.jpg" alt="Forest memory" />
                    <div className="thumb-overlay">
                      <div className="scent-name">Cedar Retreat</div>
                    </div>
                  </div>
                  <div className="thumb">
                    <img src="/images/sunset.jpg" alt="Sunset memory" />
                    <div className="thumb-overlay">
                      <div className="scent-name">Golden Dusk</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="intro-separator">
            <div className="separator-line"></div>
            <div className="separator-icon"><i className="fas fa-spray-can"></i></div>
            <div className="separator-line"></div>
          </div>
        </section>
        <section className="card upload-section">
          <h2>Capture Your Essence</h2>
          {/* AI Service Status Indicator */}
          <div className="ai-status-container">
            <div className="ai-status" id="ai-status-indicator">
              <div className="status-dot"></div>
              <span className="status-text">Checking AI connection...</span>
            </div>
          </div>
          <div className="file-input-container">
            <input type="file" id="imageUpload" accept="image/*" />
            <div className="file-drop-area">
              <i className="fas fa-cloud-upload-alt"></i>
              <h3>Curate Your Memory</h3>
              <p id="file-name">Upload an image that evokes emotion • JPG • PNG • WEBP</p>
            </div>
          </div>
          <button className="btn">
            <i className="fas fa-magic"></i> Craft My Signature Scent
          </button>
          <div className="result-container">
            <div className="loading">
              <i className="fas fa-spinner"></i>
              <p>AI analyzing your memory and crafting a personalized Perfume...</p>
            </div>
            <div className="results">
              <h3>Your Bespoke Perfume</h3>
              <div className="perfume-card">
                <div className="perfume-img">
                  <i className="fas fa-spray-can"></i>
                </div>
                <div className="perfume-details">
                  <div className="perfume-name">Enchanted Mist</div>
                  <div className="Perfume-notes">
                    <div className="note-category">
                      <span className="note-label">Top Notes</span>
                      <span className="note-separator"></span>
                    </div>
                    <div className="note-category">
                      <span className="note-label">Heart Notes</span>
                      <span className="note-separator"></span>
                    </div>
                    <div className="note-category">
                      <span className="note-label">Base Notes</span>
                      <span className="note-separator"></span>
                    </div>
                  </div>
                  <div className="perfume-desc">
                    An exquisite blend of precious amber, Tahitian vanilla, and rare sandalwood that evokes the warmth of cherished moments. 
                    Top notes of Sicilian bergamot and French lavender create an immersive sensory journey that transports you to the most serene and treasured memories.
                  </div>
                  <div className="perfume-signature">
                    <span className="signature-line"></span>
                    <span className="signature-text">Memory Perfume</span>
                    <span className="signature-line"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="card features-section">
          <h2>The Memory-to-Perfume Journey</h2>
          <div className="features">
            <div className="feature">
              <i className="fas fa-camera-retro"></i>
              <h3>Chromatic Emotion Analysis</h3>
              <p>Visual processing system extracts color relationships, luminance values, and spatial arrangements to construct a digital emotional profile of your captured memory</p>
            </div>
            <div className="feature">
              <i className="fas fa-vial"></i>
              <h3>Molecular Mapping</h3>
              <p>Advanced neural networks convert visual data into olfactory patterns, matching emotional resonance with precise molecular combinations from our scent library</p>
            </div>
            <div className="feature">
              <i className="fas fa-flask"></i>
              <h3>Precision Formulation</h3>
              <p>Laboratory-precise creation using rare botanical extracts and synthetic innovations to manifest the emotional essence of your memory into physical form</p>
            </div>
          </div>
        </section>
        <section className="testimonials-section">
          <div className="testimonials-header">
            <h2>Cherished <span className="accent-text">Memories</span> Transformed</h2>
            <p className="section-subtitle">Discover how our clients have captured their most precious moments in scent</p>
            <div className="scroll-indicator">
              <span className="scroll-text">Explore Testimonials</span>
              <div className="scroll-arrow">
                <i className="fas fa-chevron-down"></i>
              </div>
            </div>
          </div>
          <div className="gallery-container">
            <div className="memory-card">
              <div className="memory-images">
                <div className="memory-photo">
                  <img src="/images/beach-wedding.jpg" alt="Beach wedding memory" />
                </div>
                <div className="Perfume-bottle">
                  <img src="/images/sea-freeze-bliss.jpg" alt="Custom Perfume" />
                  <div className="Perfume-name">Sea Breeze Bliss</div>
                </div>
              </div>
              <div className="memory-story">
                <div className="quote-icon"><i className="fas fa-quote-left"></i></div>
                <p className="testimonial-text">
                  "Our beach wedding was the happiest day of our lives. Memory Perfume captured the essence of ocean air, 
                  tropical flowers, and joyous celebration in a scent that takes us back to that perfect moment with just one spray."
                </p>
                <p className="client-name">— Isabella & James</p>
              </div>
            </div>
            <div className="memory-card reverse">
              <div className="memory-images">
                <div className="memory-photo">
                  <img src="/images/mountain-hike.jpg" alt="Mountain hiking memory" />
                </div>
                <div className="Perfume-bottle">
                  <img src="/images/Alpine-Reverie.jpg" alt="Custom Perfume" />
                  <div className="Perfume-name">Alpine Reverie</div>
                </div>
              </div>
              <div className="memory-story">
                <div className="quote-icon"><i className="fas fa-quote-left"></i></div>
                <p className="testimonial-text">
                  "My solo trek through the Alps was a journey of self-discovery. The Perfume created from my summit 
                  photo perfectly balances crisp mountain air, pine, and that indescribable feeling of accomplishment."
                </p>
                <p className="client-name">— Alexander R.</p>
              </div>
            </div>
            <div className="memory-card">
              <div className="memory-images">
                <div className="memory-photo">
                  <img src="/images/family-gathering.jpg" alt="Family gathering memory" />
                </div>
                <div className="Perfume-bottle">
                  <img src="/images/hearth.jpg" alt="Custom Perfume" />
                  <div className="Perfume-name">Hearth & Heritage</div>
                </div>
              </div>
              <div className="memory-story">
                <div className="quote-icon"><i className="fas fa-quote-left"></i></div>
                <p className="testimonial-text">
                  "Our annual family reunion is filled with laughter, love, and grandmother's signature dishes. This scent 
beautifully captures the warmth of our gathering—cinnamon, amber, and the subtle sweetness of cherished moments."
                </p>
                <p className="client-name">— The Moreau Family</p>
              </div>
            </div>
          </div>
          <div className="cta-container">
            <h3>Begin Your Sensory Journey</h3>
            <p>Transform your most precious moments into a Perfume as unique as your memories</p>
            <a href="/contact" className="cta-btn">Create Your Bespoke Perfume</a>
          </div>
        </section>
      </div>
      <footer>
        <div className="container">
          <p>&copy; 2025 Memory Perfume • Luxury Scent Collection • All rights reserved</p>
        </div>
      </footer>
    </>
  );
}
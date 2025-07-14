import React from "react";

export default function About() {
  return (
    <>
      <nav className="top-nav">
        <div className="container nav-container">
          <div className="nav-logo">
            <a href="/"><span className="logo-icon"><i className="fas fa-spray-can"></i></span>Memory Fragrance</a>
          </div>
          <div className="nav-toggle">
            <i className="fas fa-bars"></i>
          </div>
          <ul className="nav-menu">
            <li className="nav-item"><a href="/">Home</a></li>
            <li className="nav-item"><a href="/about" className="active">About</a></li>
            <li className="nav-item"><a href="/contact" className="nav-btn">Contact Us</a></li>
          </ul>
        </div>
      </nav>
      <header>
        <div className="container">
          <h1>Our Story</h1>
          <p>The art and science behind Memory Fragrance</p>
        </div>
      </header>
      <div className="container main-content">
        <section className="card philosophy-section">
          <div className="section-content">
            <div className="text-content">
              <h2>The <span className="accent-text">Memory Fragrance</span> Philosophy</h2>
              <p className="philosophy-text">
                Founded in 2022, Memory Fragrance was born from a simple yet profound realization: 
                our strongest memories are deeply intertwined with scent. When we encounter a familiar 
                fragrance, it can instantly transport us across time and space to moments of joy, 
                adventure, or tender connection.
              </p>
              <p className="philosophy-text">
                We sought to reverse this phenomenon—to create fragrances derived directly from the 
                visual memories that mean the most to you. Our pioneering blend of artificial intelligence 
                and traditional perfumery creates a bridge between your visual memories and the 
                complex language of scent.
              </p>
              <blockquote className="philosophy-quote">
                <p>"We don't create fragrances. We translate memories into an olfactory language 
                that speaks directly to the heart."</p>
                <cite>— Nolan Tang, Founder</cite>
              </blockquote>
            </div>
            <div className="image-content">
              <img src="/images/memorial.jpg" alt="Memory Fragrance moments" className="founder-image" />
              <div className="image-caption">Keep your memorial moments eternal.</div>
            </div>
          </div>
        </section>
        <section className="card approach-section">
          <h2>Our <span className="accent-text">Unique Approach</span></h2>
          <div className="approach-container">
            <div className="approach-pillar">
              <div className="approach-icon">
                <i className="fas fa-brain"></i>
              </div>
              <h3>AI-Driven Analysis</h3>
              <p>
                Our proprietary algorithms analyze visual elements, color psychology, and emotional 
                context from your images. This technical foundation allows us to identify specific 
                olfactory families that resonate with your memory's emotional signature.
              </p>
            </div>
            <div className="approach-pillar">
              <div className="approach-icon">
                <i className="fas fa-flask"></i>
              </div>
              <h3>Artisanal Craftsmanship</h3>
              <p>
                While AI provides the blueprint, our master perfumers bring decades of expertise to 
                translate these technical specifications into exquisite fragrances. Each composition 
                is hand-crafted using the finest ingredients sourced from around the world.
              </p>
            </div>
            <div className="approach-pillar">
              <div className="approach-icon">
                <i className="fas fa-gem"></i>
              </div>
              <h3>Luxury Experience</h3>
              <p>
                Every aspect of Memory Fragrance is designed with uncompromising attention to detail. 
                From our elegant packaging to our white-glove service, we ensure that your journey 
                with us is as memorable as the fragrances we create.
              </p>
            </div>
          </div>
        </section>
        <section className="card technology-section">
          <h2>The <span className="accent-text">Science</span> of Memory Translation</h2>
          <div className="tech-container">
            <div className="tech-image">
              <img src="/images/lab.jpg" alt="Laboratory" className="lab-image" />
            </div>
            <div className="tech-content">
              <div className="tech-step">
                <div className="step-number">01</div>
                <div className="step-content">
                  <h3>Visual Analysis</h3>
                  <p>
                    Our AI examines over 200 visual attributes in your image, including color 
                    palette, lighting quality, composition, and focal elements. These are 
                    mapped to emotional and sensory responses.
                  </p>
                </div>
              </div>
              <div className="tech-step">
                <div className="step-number">02</div>
                <div className="step-content">
                  <h3>Olfactory Mapping</h3>
                  <p>
                    Visual data is translated into an olfactory blueprint using our proprietary 
                    database of over 3,000 aroma compounds and their emotional/sensory associations.
                  </p>
                </div>
              </div>
              <div className="tech-step">
                <div className="step-number">03</div>
                <div className="step-content">
                  <h3>Human Refinement</h3>
                  <p>
                    Master perfumers interpret the data through their artistic lens, selecting 
                    premium ingredients that will realize the technical specifications while 
                    adding the unmistakable human touch that defines truly magnificent fragrances.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="card values-section">
          <h2>Our <span className="accent-text">Core Values</span></h2>
          <div className="values-container">
            <div className="value-item">
              <div className="value-icon">
                <i className="fas fa-award"></i>
              </div>
              <h3>Uncompromising Quality</h3>
              <p>
                We source only the finest ingredients from trusted suppliers who share our 
                commitment to ethical and sustainable practices. Each fragrance undergoes 
                rigorous quality testing to ensure exceptional performance.
              </p>
            </div>
            <div className="value-item">
              <div className="value-icon">
                <i className="fas fa-lock"></i>
              </div>
              <h3>Privacy & Discretion</h3>
              <p>
                Your memories are deeply personal. We maintain the highest standards of data 
                security and client confidentiality throughout the entire process, from initial 
                consultation to final delivery.
              </p>
            </div>
            <div className="value-item">
              <div className="value-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <h3>Sustainability</h3>
              <p>
                Our commitment to luxury does not come at the expense of our planet. We use 
                eco-friendly packaging, support sustainable ingredient sourcing, and minimize 
                our environmental footprint at every stage.
              </p>
            </div>
            <div className="value-item">
              <div className="value-icon">
                <i className="fas fa-heart"></i>
              </div>
              <h3>Emotional Connection</h3>
              <p>
                We believe in the profound power of scent to evoke emotion and connection. 
                Every decision we make is guided by our mission to create fragrances that 
                resonate with your deepest memories and feelings.
              </p>
            </div>
          </div>
          <div className="cta-box">
            <h3>Begin Your Olfactory Journey</h3>
            <p>Experience the art of transforming your cherished memories into bespoke fragrances</p>
            <a href="/contact" className="btn">
              <i className="fas fa-paper-plane"></i> Schedule a Consultation
            </a>
          </div>
        </section>
      </div>
      <footer>
        <div className="container">
          <p>&copy; 2025 Memory Fragrance • Luxury Scent Collection • All rights reserved</p>
        </div>
      </footer>
    </>
  );
}
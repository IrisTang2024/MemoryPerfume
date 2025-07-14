import React from "react";

export default function Contact() {
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
            <li className="nav-item"><a href="/">Home</a></li>
            <li className="nav-item"><a href="/about">About</a></li>
            <li className="nav-item"><a href="/contact" className="nav-btn active">Contact Us</a></li>
          </ul>
        </div>
      </nav>
      <header>
        <div className="container">
          <h1>Contact Us</h1>
          <p>Begin your journey towards a truly bespoke Perfume experience</p>
        </div>
      </header>
      <div className="container main-content">
        <section className="card contact-section">
          <h2>Create Your Bespoke Perfume</h2>
          <p className="contact-intro">
            Our master perfumers are ready to craft a Perfume that captures your most cherished memories.
            Fill out the form below to begin your personalized luxury Perfume journey.
          </p>
          <div className="contact-container">
            <div className="contact-form">
              <form id="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" />
                </div>
                <div className="form-group">
                  <label htmlFor="Perfume-type">Preferred Perfume Family</label>
                  <select id="Perfume-type" name="Perfume-type">
                    <option value="">Select a Perfume family</option>
                    <option value="floral">Floral</option>
                    <option value="oriental">Oriental</option>
                    <option value="woody">Woody</option>
                    <option value="fresh">Fresh</option>
                    <option value="unsure">I'm not sure</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Tell us about your memory or inspiration</label>
                  <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit" className="btn">
                  <i className="fas fa-paper-plane"></i> Submit Request
                </button>
              </form>
            </div>
            <div className="contact-info">
              <div className="info-card">
                <div className="info-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <h3>Our Atelier</h3>
                <p>123 Essence Boulevard<br />Perfume District<br />New York, NY 10001</p>
              </div>
              <div className="info-card">
                <div className="info-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <h3>Consultation Hours</h3>
                <p>Monday - Friday: 10am - 6pm<br />Saturday: 11am - 4pm<br />Sunday: By appointment only</p>
              </div>
              <div className="info-card">
                <div className="info-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <h3>Contact Details</h3>
                <p>Email: info@memoryPerfume.com<br />Phone: (212) 555-0123</p>
              </div>
            </div>
          </div>
        </section>
        <section className="card process-section">
          <h2>The Bespoke Process</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Consultation</h3>
              <p>Initial discussion about your memories, preferences, and Perfume goals</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Profile Creation</h3>
              <p>Our perfumers analyze your memory and create an olfactory profile</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Sample Creation</h3>
              <p>Development of custom Perfume samples tailored to your profile</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Refinement</h3>
              <p>Fine-tuning the Perfume based on your feedback</p>
            </div>
            <div className="process-step">
              <div className="step-number">5</div>
              <h3>Final Creation</h3>
              <p>Production of your unique Perfume in a luxury presentation box</p>
            </div>
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
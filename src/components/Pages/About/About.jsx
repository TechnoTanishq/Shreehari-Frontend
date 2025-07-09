import React from 'react'
import "./about.css"

const About = () => {
  return (
    <>
      <section class="about-us">
        <div class="about-text">
          <h1>About Shrihari Jewellers</h1>
          <p>
            Shrihari Jewellers has been a symbol of purity and trust since 1990. We blend traditional Indian craftsmanship
            with modern designs to create timeless gold jewellery for every occasion.
          </p>
          <p>
            Located in the heart of Chhatrapati Sambhajinagar, we are known for our quality, elegance, and customer
            satisfaction. Our collections range from bridal treasures to daily wear delicacies, all crafted with love and
            precision.
          </p>
        </div>
        <div class="about-images">
          <img src="/assets/images/about-model2.jpg" alt="Jewellery Model 1" />
        </div>
      </section>

      <section class="team-section">
        <h2>Meet Our Team</h2>
        <div class="team-grid">
          <div class="team-member">
            <img src="/assets/images/team1.jpg" alt="Founder" />
            <h4>Shrikant Joshi</h4>
            <p>Founder & Master Craftsman</p>
          </div>
          <div class="team-member">
            <img src="/assets/images/team2.jpg" alt="Designer" />
            <h4>Anita Rane</h4>
            <p>Chief Jewellery Designer</p>
          </div>
          <div class="team-member">
            <img src="/assets/images/team3.jpg" alt="Marketing Head" />
            <h4>Rahul More</h4>
            <p>Head of Marketing</p>
          </div>
        </div>
      </section>

      <section class="timeline-section">
        <h2>Our Journey</h2>
        <div class="timeline">
          <div class="timeline-item">
            <span class="year">1990</span>
            <p>Shrihari Jewellers was founded as a small gold shop.</p>
          </div>
          <div class="timeline-item">
            <span class="year">2005</span>
            <p>Expanded to a full-scale showroom with in-house design lab.</p>
          </div>
          <div class="timeline-item">
            <span class="year">2015</span>
            <p>Launched exclusive bridal jewellery collections.</p>
          </div>
          <div class="timeline-item">
            <span class="year">2025</span>
            <p>Launched our official website and online catalogue.</p>
          </div>
        </div>
      </section>

      <section class="testimonials">
        <h2>What Our Customers Say</h2>
        <div class="testimonial-grid">
          <div class="testimonial">
            <p>“Absolutely loved the mens collection! Stunning designs and amazing service.”</p>
            <span>- Tanishq Kathar</span>
          </div>
          <div class="testimonial">
            <p>“My family has trusted Shrihari Jewellers for decades. Quality you can feel.”</p>
            <span>- Pavan More</span>
          </div>
          <div class="testimonial">
            <p>“The online store is beautifully made and delivery was prompt. Very happy!”</p>
            <span>- Chaitanya Wagh</span>
          </div>
          <div class="testimonial">
            <p>“Loved the designs of the jewels and ! They are just amazing and stunning designs.”</p>
            <span>- Kartik Mahanor</span>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
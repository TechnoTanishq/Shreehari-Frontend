import React from 'react'
import "./Footer.css"

const Footer = () => {
    return (
        <>
            <footer class="main-footer">
                <div class="footer-top">
                    <div class="footer-col">

                        <img src="\assets\images\logo.png" alt="ogo" height={"200px"} width={"200px"} />
                        <p style={{ width: "250px", marginTop: "20px" }}>
                            Trusted legacy in fine jewelry for over 20 years.
                        </p>
                    </div>

                    <div class="footer-col">
                        <h2>Useful links</h2>
                        <ul>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">FAQs</a></li>
                            <li><a href="#">Order Tracking</a></li>
                            <li><a href="#">Returns</a></li>
                        </ul>
                    </div>

                    <div class="footer-col">
                        <h2>Our Policies</h2>
                        <ul>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Use</a></li>
                            <li><a href="#">Shipping Policy</a></li>
                            <li><a href="#">Exchange Policy</a></li>
                        </ul>
                    </div>

                    <div class="footer-col">
                        <h2>Follow Us</h2>
                        <div class="social-icons">
                            <a href="#"><i class="fab fa-facebook-f"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                            <a href="#"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>

                <div class="footer-bottom">
                    <p>&copy; 2025 SHREEHARI JEWELLERS. All rights reserved.</p>
                </div>
            </footer>
        </>
    )
}

export default Footer
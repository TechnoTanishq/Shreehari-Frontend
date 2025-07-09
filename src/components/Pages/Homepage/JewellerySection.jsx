import React from 'react'
import "./JewellerySection.css"

const JewellerySection = () => {
    return (
        <>
            <section className="jewellery-section">
                <h2>Find Your Perfect Match</h2>
                <div className="jewellery-grid">

                    <div className="jewel-card">
                        <img src="/assets/images/rings.jpg" alt="Rings"/>
                            <h3>Rings</h3>
                            <a href="/products">Explore <i className="fa-solid fa-angle-right"></i></a>
                    </div>

                    <div className="jewel-card">
                        <img src="/assets/images/earrings.jpg" alt="Earrings"/>
                            <h3>Earrings</h3>
                            <a href="/products">Explore <i className="fa-solid fa-angle-right"></i></a>
                    </div>

                    <div className="jewel-card">
                        <img src="/assets/images/pendants.jpg" alt="Pendants"/>
                            <h3>Pendants</h3>
                            <a href="/products">Explore <i className="fa-solid fa-angle-right"></i></a>
                    </div>

                    <div className="jewel-card">
                        <img src="/assets/images/anklets.jpg" alt="Anklets"/>
                            <h3>Anklets</h3>
                            <a href="/products">Explore <i className="fa-solid fa-angle-right"></i></a>
                    </div>

                    <div className="jewel-card">
                        <img src="/assets/images/nosepins.jpg" alt="Nose Pins"/>
                            <h3>Nose Pins</h3>
                            <a href="/products">Explore <i className="fa-solid fa-angle-right"></i></a>
                    </div>

                    <div className="jewel-card">
                        <img src="/assets/images/bracelet.jpg" alt="Bracelet Sets"/>
                            <h3>Bracelet</h3>
                            <a href="/products">Explore <i className="fa-solid fa-angle-right"></i></a>
                    </div>

                    <div className="jewel-card">
                        <img src="/assets/images/bangles.jpg" alt="Anklets"/>
                            <h3>Bangles</h3>
                            <a href="/products">Explore <i className="fa-solid fa-angle-right"></i></a>
                    </div>

                    <div className="jewel-card">
                        <img src="/assets/images/mangalsutra.jpg" alt="Nose Pins"/>
                            <h3>Mangalsutra</h3>
                            <a href="/products">Explore <i className="fa-solid fa-angle-right"></i></a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default JewellerySection
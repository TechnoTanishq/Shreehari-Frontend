import React, { useEffect, useRef, useState } from 'react';
import "./MainSlider.css"

const MainSlider = () => {
    const slidesRef = useRef([]);
    const [counter, setCounter] = useState(0);
    const [hover, setHover] = useState(false);

    const slideImages = [
        "/assets/hero-slider/slider1.jpg",
        "/assets/hero-slider/slider2.webp",
        "/assets/hero-slider/slider3.webp",
        "/assets/hero-slider/slider4.webp",
        "/assets/hero-slider/slider5.webp",
        "/assets/hero-slider/slider6.webp",
    ];

    const totalSlides = slideImages.length;

    const slideImage = (index) => {
        slidesRef.current.forEach((slide) => {
            slide.style.transform = `translateX(-${index * 100}%)`;
        });
    };

    const goNext = () => {
        setCounter((prev) => {
            const newCounter = (prev + 1) % totalSlides;
            slideImage(newCounter);
            return newCounter;
        });
    };

    const goPrev = () => {
        setCounter((prev) => {
            const newCounter = (prev - 1 + totalSlides) % totalSlides;
            slideImage(newCounter);
            return newCounter;
        });
    };

    const handleDotClick = (index) => {
        setCounter(index);
        slideImage(index);
    };

    useEffect(() => {
        slidesRef.current.forEach((slide, index) => {
            slide.style.left = `${index * 100}%`;
        });

        const interval = setInterval(() => {
            if (!hover) {
                setCounter((prev) => {
                    const next = (prev + 1) % totalSlides;
                    slideImage(next);
                    return next;
                });
            }
        }, 4500);

        return () => clearInterval(interval);
    }, [hover, totalSlides]);

    return (
        <section className="hero-slider">
            <div className="slides">
                {slideImages.map((src, index) => (
                    <div
                        className="slide"
                        key={index}
                        ref={(el) => (slidesRef.current[index] = el)}
                    >
                        <img src={src} alt={`Slide ${index}`} />
                    </div>
                ))}

                <button
                    className="navigation prev"
                    onClick={goPrev}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    &#10094;
                </button>
                <button
                    className="navigation next"
                    onClick={goNext}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    &#10095;
                </button>
            </div>

            {/* 🔵 Dot Indicators */}
            <div className="dots-container">
                {slideImages.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${counter === index ? "active" : ""}`}
                        onClick={() => handleDotClick(index)}
                    ></span>
                ))}
            </div>
        </section>
    );
};

export default MainSlider;

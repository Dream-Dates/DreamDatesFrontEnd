// Carousel.js
import { useState, useRef, useLayoutEffect } from "react";
import leftArrow from "../assets/leftArrow.svg";
import rightArrow from "../assets/rightArrow.svg";

function Carousel({ data, location }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [totalContentWidth, setTotalContentWidth] = useState(0);

    const carouselContentRef = useRef(null);

    const widthOfScroll = 300; // how much horizontal scroll we want

    // get the total width of the carousel content element
    useLayoutEffect(() => {
        setTotalContentWidth(carouselContentRef.current.scrollWidth);
    }, []);

    const next = () => {
        if (currentIndex * widthOfScroll < totalContentWidth - widthOfScroll) {
            setCurrentIndex((prevState) => prevState + 1);
        }
    };

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevState) => prevState - 1);
        }
    };

    if (location == "modalImage") {
        return (
            <div className="carouselContainer">
                <div className="carouselWindow">
                    <div
                        className="carouselContent"
                        id="slider"
                        ref={carouselContentRef}
                        style={{
                            transform: `translateX(-${currentIndex * 300}px)`,
                        }}
                    >
                        {data.map((item, index) => {
                            return (
                                <div className="carouselCard" key={index}>
                                    <img src={item} alt=".dd" />
                                </div>
                            );
                        })}
                    </div>
                    <button
                        className={`leftArrow ${
                            currentIndex == 0 && "disable-button"
                        }`}
                        onClick={prev}
                    >
                        <img src={leftArrow} alt="previous" />
                    </button>
                    <button
                        className={`rightArrow ${
                            currentIndex * widthOfScroll >
                                totalContentWidth - widthOfScroll &&
                            "disable-button"
                        }`}
                        onClick={next}
                    >
                        <img src={rightArrow} alt="next" />
                    </button>
                </div>
            </div>
        );
    }

    if (location == "modalReviews") {
        return (
            <div className="carouselContainer">
                <div className="carouselWindow">
                    <div
                        className="carouselContent"
                        id="slider"
                        ref={carouselContentRef}
                        style={{
                            transform: `translateX(-${currentIndex * 300}px)`,
                        }}
                    >
                        {data.map((item, index) => {
                            return (
                                <div className="carouselCard" key={index}>
                                    <img src={item} alt=".dd" />
                                </div>
                            );
                        })}
                    </div>
                    <button
                        className={`leftArrow ${
                            currentIndex == 0 && "disable-button"
                        }`}
                        onClick={prev}
                    >
                        <img src={leftArrow} alt="previous" />
                    </button>
                    <button
                        className={`rightArrow ${
                            currentIndex * widthOfScroll >
                                totalContentWidth - widthOfScroll &&
                            "disable-button"
                        }`}
                        onClick={next}
                    >
                        <img src={rightArrow} alt="next" />
                    </button>
                </div>
            </div>
        );
    }
}

export default Carousel;

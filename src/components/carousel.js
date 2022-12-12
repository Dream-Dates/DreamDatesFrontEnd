// Carousel.js
import { useEffect, useState } from "react";
import leftArrow from "../assets/leftArrow.svg";
import rightArrow from "../assets/rightArrow.svg";

function Carousel({ data }) {
    const [leftDisable, setLeftDisabled] = useState(true)
    const [rightDisable, setRightDisabled] = useState(false)
        const [currentIndex, setCurrentIndex] = useState(0);
        // const [length, setLength] = useState(0);

    const widthOfScroll = 300 // how much horizontal scroll we want
    let totalContentWidth

    const next = () => {
        // get slider element
        const slider = document.getElementById("slider");
        // get the total width
        totalContentWidth = slider.scrollWidth

        if (currentIndex * widthOfScroll < totalContentWidth - widthOfScroll) {
            setCurrentIndex((prevState) => prevState + 1);
        }
    };

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevState) => prevState - 1);
        }
    };

    return (
        <>
            <div className="carouselContainer">
                <div className="carouselWindow">
                    <div
                        className="carouselContent"
                        id="slider"
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
                            currentIndex * widthOfScroll < totalContentWidth - widthOfScroll && "disable-button"
                        }`}
                        onClick={next}
                    >
                        <img src={rightArrow} alt="next" />
                    </button>
                </div>
            </div>
        </>
    );
}

export default Carousel;

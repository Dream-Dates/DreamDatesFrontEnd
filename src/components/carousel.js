// Carousel.js
import { useState, useRef, useLayoutEffect } from "react";
import leftArrow from "../assets/leftArrow.svg";
import rightArrow from "../assets/rightArrow.svg";

function Carousel({ data, location }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [totalContentWidth, setTotalContentWidth] = useState(0);

        const [rightArrowDisabled, setRightArrowDisabled] = useState(false);
        const [leftArrowDisabled, setLeftArrowDisabled] = useState(true);

    const carouselContentRef = useRef(null);

    const widthOfScroll = 300; // how much horizontal scroll we want

    // get the total width of the carousel content element
    useLayoutEffect(() => {
        // setTotalContentWidth(carouselContentRef.current.scrollWidth);
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

    let clickable = true
    const right = (e) => {
        console.log(e);
        // find the closest carousel and scroll the ul by 500px to the right
        const carouselRef = e.target.closest(".testCarousel");
        carouselRef.firstChild.scrollBy(500, 0);

        // if the left arrow is disabled, enable it after a right click
        if (leftArrowDisabled) {
            setLeftArrowDisabled(false);
        }
        setTimeout(() => {
            // get the right position of the carousel
            const { right } = carouselRef.getBoundingClientRect();
            // get the right positionof the last li in the carousel
            const lastLiElement = carouselRef.firstChild.lastChild;
            const lastLiElementRec = lastLiElement.getBoundingClientRect();
            if (lastLiElementRec.right === right) {
                setRightArrowDisabled(true);
            }
            clickable = true;
        }, 500);
    }

    const left = (e) => {
        console.log(e);
        // find the closest carousel and scroll the ul by 500px to the left
        const carouselRef = e.target.closest(".testCarousel");
        carouselRef.firstChild.scrollBy(-500, 0);

        // if the left arrow is disabled, enable it after a right click
        if (rightArrowDisabled) {
            setRightArrowDisabled(false);
        }
        setTimeout(() => {
            // get the left position of the carousel
            const { left } = carouselRef.getBoundingClientRect();
            // get the right position of the first li in the carousel
            const firstLiElement = carouselRef.firstChild.firstChild;
            const firstLiElementRec = firstLiElement.getBoundingClientRect();
            if (firstLiElementRec.left === left) {
                setLeftArrowDisabled(true);
            }
            clickable = true;
        }, 500);
    }

    if (location == "modalImage") {
        return (
            <div className="testCarousel">
                <ul className="carouseImageList">
                    {data.map((item, index) => {
                        return (
                            <li key={index}>
                                <img src={item} alt="event images" />
                            </li>
                        );
                    })}
                </ul>
                <button
                    className={`carouselArrow leftArrow ${
                        leftArrowDisabled && "disable-button"
                    }`}
                    onClick={(e) => left(e)}
                >
                    <span></span>
                    <img src={leftArrow} alt="previous" />
                </button>
                <button
                    className={`carouselArrow rightArrow ${
                        rightArrowDisabled && "disable-button"
                    }`}
                    onClick={(e) => right(e)}
                >
                    <span></span>
                    <img src={rightArrow} alt="next" />
                </button>
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
                        className={`carouselArrow leftArrow ${
                            currentIndex == 0 && "disable-button"
                        }`}
                        onClick={prev}
                    >
                        <img src={leftArrow} alt="previous" />
                        <span></span>
                    </button>
                    <button
                        className={`carouselArrow rightArrow ${
                            currentIndex * widthOfScroll >
                                totalContentWidth - widthOfScroll &&
                            "disable-button"
                        }`}
                        onClick={next}
                    >
                        <span></span>
                        <img src={rightArrow} alt="next" />
                    </button>
                </div>
            </div>
        );
    }
}

export default Carousel;

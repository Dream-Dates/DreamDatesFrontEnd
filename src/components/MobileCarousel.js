// MobileCarousel.js
import { useState } from "react";
import leftArrow from "../assets/leftArrow.svg";
import rightArrow from "../assets/rightArrow.svg";

function MobileCarousel({ data }) {
    const [leftDisable, setLeftDisabled] = useState(true)
    const [rightDisable, setRightDisabled] = useState(false)


    const slideLeft = () => {
        const slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft - 300;
        
        setTimeout(() => {
            checkSlideLocation(slider.scrollLeft, slider.scrollWidth)
        }, 300);
    };

    const slideRight = () => {
        const slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft + 300;
        
        setTimeout(() => {
            checkSlideLocation(slider.scrollLeft, slider.scrollWidth)
        }, 300);
    };

    // check the value of scrollLeft is less than 290 disable left button, if scrollwidth - left - 300 is less than 300 disable right button
    const checkSlideLocation = (left, width) => {
        console.log(left)
            if (left == 0) {
                console.log('left disabled')
                setLeftDisabled(true)
            } else {
                console.log('left is enabled')
                setLeftDisabled(false)
            }

            if (width - 300 - left < 300 ) {
                console.log('right disabled')
                setRightDisabled(true)
            } else {
                console.log('right is enabled')
                setRightDisabled(false)
            }
    }

    return (
        <div className="carousel">
            <button className={`carouselControls prev ${leftDisable && 'disable-link'}`} onClick={slideLeft}>
                {" "}
                <img src={leftArrow} alt="previous" />{" "}
            </button>
            <div className="carouselContainer" id="slider">
                {data.map((item, index) => {
                    return (
                        <div className="carouselCard" key={index}>
                            <img src={item} alt=".dd" />
                        </div>
                    );
                })}
            </div>
            <button className={`carouselControls next ${rightDisable && 'disable-link'}`} onClick={slideRight}>
                {" "}
                <img src={rightArrow} alt="next" />{" "}
            </button>
        </div>
    );
}

export default MobileCarousel;

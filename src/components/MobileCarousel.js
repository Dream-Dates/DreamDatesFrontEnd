// MobileCarousel.js
import { useState } from "react";
import leftArrow from "../assets/leftArrow.svg";
import rightArrow from "../assets/rightArrow.svg";
import reviewStarRed from "../assets/reviewStarRed.svg"
import reviewUserPicture from "../assets/ReviewUserPicture.svg"

function MobileCarousel({ imageData }) {
    const [leftDisable, setLeftDisabled] = useState(true)
    const [rightDisable, setRightDisabled] = useState(false)

    const widthOfImg = 272; 
    let ready = true;

    const slideLeft = () => {
        if (ready) {
            ready = false
            const slider = document.getElementById("mobileSlider");
            slider.scrollLeft = slider.scrollLeft - widthOfImg;
            
            setTimeout(() => {
                checkSlideLocation(slider.scrollLeft, slider.scrollWidth)
                ready = true
            }, 300);
        }
    };

    const slideRight = () => {
        if (ready) {
            ready = false
            const slider = document.getElementById("mobileSlider");
            slider.scrollLeft = slider.scrollLeft + widthOfImg;
            
            setTimeout(() => {
                checkSlideLocation(slider.scrollLeft, slider.scrollWidth)
                ready = true
            }, 300);
        }
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

            if (width - widthOfImg - left < widthOfImg ) {
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


            <div className="carouselContainer" id="mobileSlider">
                {imageData?.map((item, index) => {
                    return (
                        <div className="carouselCard" key={index}>
                            <img src={item} alt=".dd" />
                        </div>
                    );
                })}
                <div className="carouselCard review">
                    <div className="reviewHeader">
                        <p>Reviewer's name</p>
                        <p>⭐⭐⭐⭐⭐</p>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor rerum voluptatibus amet possimus adipisci quam, tempore voluptate nobis atque officia earum reiciendis labore sint, obcaecati delectus non, harum ipsum architecto modi error consectetur? Sit temporibus ipsum minus consequuntur sunt. Itaque eos saepe excepturi velit illum ex nam magni aspernatur qui.</p>
                </div>
                <div className="carouselCard review">
                    <div className="reviewHeader">
                        <p>Reviewer's name</p>
                        <p>⭐⭐⭐⭐⭐</p>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor rerum voluptatibus amet possimus adipisci quam, tempore voluptate nobis atque officia earum reiciendis labore sint, obcaecati delectus non, harum ipsum architecto modi error consectetur? Sit temporibus ipsum minus consequuntur sunt. Itaque eos saepe excepturi velit illum ex nam magni aspernatur qui.</p>
                </div>
            </div>


            <button className={`carouselControls next ${rightDisable && 'disable-link'}`} onClick={slideRight}>
                {" "}
                <img src={rightArrow} alt="next" />{" "}
            </button>
        </div>
    );
}

export default MobileCarousel;

// MobileCarousel.js
import { useState } from "react";
import leftArrow from "../assets/leftArrow.svg";
import rightArrow from "../assets/rightArrow.svg";
import reviewStarRed from "../assets/reviewStarRed.svg";
import reviewUserPicture from "../assets/ReviewUserPicture.svg";
import reviewStar from "../assets/ReviewStar.svg";

function MobileCarousel({ imageData, location, rating }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide(
            currentSlide === imageData.length - 1 ? 0 : currentSlide + 1
        );
    };

    const prevSlide = () => {
        setCurrentSlide(
            currentSlide === 0 ? imageData.length - 1 : currentSlide - 1
        );
    };

    const [reviewReadMore, setReviewReadMore] = useState([]);

    const reviewStarsDisplay = (score, category) => {
        // round the score to a whole number
        let rating = Math.round(+score);

        // movies rating is out of 10 so we have to divide by 2 and round up
        if (category == "movies") rating = Math.ceil(score / 2);

        if (rating == 0)
            return (
                <>
                    <img src={reviewStar} alt="star logo" />
                    <img src={reviewStar} alt="star logo" />
                    <img src={reviewStar} alt="star logo" />
                    <img src={reviewStar} alt="star logo" />
                    <img src={reviewStar} alt="star logo" />
                </>
            );

        if (rating == 1)
            return (
                <>
                    <img src={reviewStarRed} alt="star logo" />
                    <img src={reviewStar} alt="star logo" />
                    <img src={reviewStar} alt="star logo" />
                    <img src={reviewStar} alt="star logo" />
                    <img src={reviewStar} alt="star logo" />
                </>
            );

        if (rating == 2)
            return (
                <>
                    <img src={reviewStarRed} alt="star logo" />
                    <img src={reviewStarRed} alt="star logo" />{" "}
                    <img src={reviewStar} alt="star logo" />
                    <img src={reviewStar} alt="star logo" />
                    <img src={reviewStar} alt="star logo" />
                </>
            );

        if (rating == 3)
            return (
                <>
                    <img src={reviewStarRed} alt="star logo" />
                    <img src={reviewStarRed} alt="star logo" />
                    <img src={reviewStarRed} alt="star logo" />
                    <img src={reviewStar} alt="star logo" />
                    <img src={reviewStar} alt="star logo" />
                </>
            );

        if (rating == 4)
            return (
                <>
                    <img src={reviewStarRed} alt="star logo" />
                    <img src={reviewStarRed} alt="star logo" />
                    <img src={reviewStarRed} alt="star logo" />
                    <img src={reviewStarRed} alt="star logo" />
                    <img src={reviewStar} alt="star logo" />
                </>
            );

        if (rating == 5)
            return (
                <>
                    <img src={reviewStarRed} alt="star logo" />
                    <img src={reviewStarRed} alt="star logo" />
                    <img src={reviewStarRed} alt="star logo" />
                    <img src={reviewStarRed} alt="star logo" />
                    <img src={reviewStarRed} alt="star logo" />
                </>
            );
    };

    // show the full user review
    const handleClick = (e) => {
        e.target.style.display = "none";
        e.target.previousElementSibling.className = "showFullReview";
    };

    if (location === "images") {
        return (
            <div className="mobileCarouselContainer">
                <div className="mobileCarouselWindow">
                    <img src={imageData[currentSlide]} alt="carousel slide" />
                    <button
                        className={`carouselArrow leftArrow`}
                        onClick={prevSlide}
                    >
                        <img src={leftArrow} alt="previous" />
                        <span></span>
                    </button>
                    <button
                        className={`carouselArrow rightArrow`}
                        onClick={nextSlide}
                    >
                        <span></span>
                        <img src={rightArrow} alt="next" />
                    </button>
                </div>
            </div>
        );
    }

    if (location === "reviews") {
        return (
            <div className="mobileCarouselContainer mobileReview">
                <div className="mobileCarouselWindow">
                    <div className="reviewsHeader">
                        <img src={reviewStar} alt="star logo" />
                        <h3> Reviews </h3>
                        <div className="reviewStars">
                            {reviewStarsDisplay(rating)}
                        </div>
                        {/* <p> (1,551)</p>  */}
                    </div>

                    <div
                        className="review"
                        key={imageData[currentSlide].author_name}
                    >
                        <div className="reviewHeader">
                            <div>
                                <img
                                    src={
                                        imageData[currentSlide]
                                            .profile_photo_url
                                    }
                                    alt="reviewer's user picture"
                                />
                                <p>{imageData[currentSlide].author_name}</p>
                            </div>
                            <div className="reviewStars">
                                {reviewStarsDisplay(
                                    imageData[currentSlide].rating
                                )}
                            </div>
                        </div>
                        <p
                            className={`reviewText ${
                                reviewReadMore.includes(
                                    imageData[currentSlide].text
                                ) && "showFullReview"
                            }`}
                        >
                            {imageData[currentSlide].text}
                        </p>
                        <button
                            className={`reviewReadMore ${
                                imageData[currentSlide].text.length < 195 &&
                                "displayNone"
                            }`}
                            onClick={(e) => handleClick(e)}
                        >
                            Read More
                        </button>
                    </div>
                    <button
                        className={`carouselArrow leftArrow`}
                        onClick={prevSlide}
                    >
                        <img src={leftArrow} alt="previous" />
                        <span></span>
                    </button>
                    <button
                        className={`carouselArrow rightArrow`}
                        onClick={nextSlide}
                    >
                        <span></span>
                        <img src={rightArrow} alt="next" />
                    </button>
                </div>
            </div>
        );
    }
}

export default MobileCarousel;

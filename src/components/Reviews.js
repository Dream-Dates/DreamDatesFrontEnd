// Reviews.js
import { useState } from "react";
import reviewStar from "../assets/ReviewStar.svg";
import reviewStarRed from "../assets/reviewStarRed.svg";

function Reviews({ reviews, rating }) {

    const [reviewReadMore, setReviewReadMore] = useState([])

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
        e.target.style.display = "none"
        e.target.previousElementSibling.className = "showFullReview";
    }

    return (
        <div className="reviews">
            <div className="reviewsContainer">
                <div className="reviewsHeader">
                    <img src={reviewStar} alt="star logo" />
                    <h3> Reviews </h3>
                    <div className="reviewStars">
                        {reviewStarsDisplay(rating)}
                    </div>
                    {/* <p> (1,551)</p>  */}
                </div>

                {reviews?.map((review) => {
                    return (
                        <div className="review" key={review.author_name}>
                            <div className="reviewHeader">
                                <div>
                                    <img
                                        src={review.profile_photo_url}
                                        alt="reviewer's user picture"
                                    />
                                    <p>{review.author_name}</p>
                                </div>
                                <div className="reviewStars">
                                    {reviewStarsDisplay(review.rating)}
                                </div>
                            </div>
                            <p className={`reviewText ${reviewReadMore.includes(review.text) && 'showFullReview'}`}>{review.text}</p>
                            <button className={`reviewReadMore ${review.text.length < 195 && 'displayNone'}`} onClick={(e) => handleClick(e)} >
                                Read More
                            </button>
                        </div>
                    );
                })}

                <button className="reviewsScrollMore">
                    Scroll for more reviews
                </button>
            </div>
        </div>
    );
}

export default Reviews;

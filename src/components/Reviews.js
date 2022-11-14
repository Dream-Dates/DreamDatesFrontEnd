// Reviews.js
import reviewStar from "../assets/ReviewStar.svg"
import reviewStarRed from "../assets/reviewStarRed.svg"
import reviewUserPicture from "../assets/ReviewUserPicture.svg"

function Reviews() {
    return (
        <div className="reviews">
            <div className="reviewsContainer">
                <div className="reviewsHeader">
                    <img src={reviewStar} alt="star logo" />
                    <h5> Reviews <img src={reviewStarRed} alt="red star logo" /><img src={reviewStarRed} alt="red star logo" /><img src={reviewStarRed} alt="red star logo" /><img src={reviewStarRed} alt="red star logo" /><img src={reviewStarRed} alt="red star logo" /> (1,551)</h5>
                </div>
                <div className="review">
                    <div className="reviewHeader">
                        <div>
                            <img src={reviewUserPicture} alt="default user picture" />
                            <p>Reviewer's name</p>
                        </div>
                        <p><img src={reviewStarRed} alt="red star logo" /><img src={reviewStarRed} alt="red star logo" /></p>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor rerum voluptatibus amet possimus adipisci quam, tempore voluptate nobis atque officia earum reiciendis labore sint, obcaecati delectus non, harum ipsum architecto modi error consectetur? Sit temporibus ipsum minus consequuntur sunt. Itaque eos saepe excepturi velit illum ex nam magni aspernatur qui.</p>
                    <p>Read more</p>
                </div>
                <div className="review">
                    <div className="reviewHeader">
                        <p>Reviewer's name</p>
                        <p>⭐⭐⭐⭐⭐</p>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor rerum voluptatibus amet possimus adipisci quam, tempore voluptate nobis atque officia earum reiciendis labore sint, obcaecati delectus non, harum ipsum architecto modi error consectetur? Sit temporibus ipsum minus consequuntur sunt. Itaque eos saepe excepturi velit illum ex nam magni aspernatur qui.</p>
                </div>
                <div className="review">
                    <div className="reviewHeader">
                        <p>Reviewer's name</p>
                        <p>⭐⭐⭐⭐⭐</p>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor rerum voluptatibus amet possimus adipisci quam, tempore voluptate nobis atque officia earum reiciendis labore sint, obcaecati delectus non, harum ipsum architecto modi error consectetur? Sit temporibus ipsum minus consequuntur sunt. Itaque eos saepe excepturi velit illum ex nam magni aspernatur qui.</p>
                </div>
                <p className="scrollMore">Scroll for more reviews</p>
            </div>
        </div>
    )
}

export default Reviews
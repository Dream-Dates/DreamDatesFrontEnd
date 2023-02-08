// DateIdeasList.js
import { useRef, useState } from "react";
import { useEffect } from "react";
import whiteHeart from "../assets/whiteHeart.svg";
import whiteHeartNoOutline from "../assets/whiteHeartNoOutline.svg";
import redHeart from "../assets/redHeart.svg";
import x from "../assets/X.svg";
import defaultImagePlaceholderSmall from "../assets/defaultImagePlaceholderSmall.jpg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import Context from "../context/context";
import reviewStarWhiteOutline from "../assets/reviewStartWhiteOutline.svg";
import reviewStarWhite from "../assets/reviewStarWhite.svg";
import leftArrow from "../assets/leftArrow2.svg";
import rightArrow from "../assets/rightArrow.svg";

function DateIdeasList({
    ideas,
    selectedEvent,
    userId,
    searchTerm,
    categoryName,
    viewAll,
}) {
    let mainList = [];
    const [list, setList] = useState([]);
    const [closeNotSignedIn, setCloseNotSignedIn] = useState(false);
    const [saved, setSaved] = useState([]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [length, setLength] = useState(0);
    const carouselContent = useRef();

    const [rightArrowDisabled, setRightArrowDisabled] = useState(false);
    const [leftArrowDisabled, setLeftArrowDisabled] = useState(true);

    // Set the length to match current of the list after filter
    useEffect(() => {
        // each card is 294px wide multiple that by the number of total cards to get the total length
        // divide by the width of the carouselContent container to get total number of segments
        let totalCardWidth = filteredList?.length * 294;
        let totalGapWidth = (filteredList?.length - 1) * 42; // gap or spacing between the cards
        let totalContentWidth = totalCardWidth + totalGapWidth;
        let carouselWidth = carouselContent.current
            ? carouselContent.current.offsetWidth
            : 0;
        setLength(Math.ceil(totalContentWidth / carouselWidth));
    }, [searchTerm]);

    const next = () => {
        if (currentIndex < length - 1) {
            setCurrentIndex((prevState) => prevState + 1);
        }
    };

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevState) => prevState - 1);
        }
    };

    useEffect(() => {
        setList(ideas);
        // I do not understand why carouselContent.current?.offsetWidthWidth is not working and have to carouselContent.current ? carouselContent.current.offsetWidth : 0
        console.log(ideas?.length);
        console.log(carouselContent.current?.offsetWidthWidth);
        console.log(
            "width",
            carouselContent.current ? carouselContent.current.offsetWidth : 0
        );
        let totalCardWidth = ideas?.length * 294;
        let totalGapWidth = (ideas?.length - 1) * 25;
        let totalContentWidth = totalCardWidth + totalGapWidth;
        let carouselWidth = carouselContent.current
            ? carouselContent.current.offsetWidth
            : 0;

        console.log(carouselWidth);
        console.log(Math.ceil(totalContentWidth / carouselWidth));
        setLength(Math.ceil(totalContentWidth / carouselWidth));
    }, [ideas]);

    useEffect(() => {
        const fetchSaved = async () => {
            const response = await fetch(
                "https://dream-dates.herokuapp.com/dreamdates/saved/dates",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        user_id: userId,
                    }),
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    const savedId = [];
                    data.forEach((item) => {
                        savedId.push(item.id);
                    });
                    setSaved(savedId);
                });
        };

        fetchSaved();
    }, [ideas]);

    // remove zip code from city
    const noZipCode = (city) => {
        // const reg = /(?<![0-9-])([0-9]{5}(?:[ -][0-9]{4})?)(?![0-9-])/gm;
        const str = city;
        // return str.replace(reg, "");
    };

    // if no userId (not signed in) when trying to save, sign in pop up
    const handleClick = () => {
        if (!userId) {
            // sign up or sign in pop up
            setCloseNotSignedIn(!closeNotSignedIn);
        }
    };

    // closing the sign in and sing up pop up
    const handleClickNotSignInClose = (e) => {
        if (e.target.className === "catch" || e.target.id === "closeCatch") {
            setCloseNotSignedIn(!closeNotSignedIn);
        }
    };

    // converting the price range from numbers to $
    const dollarSigns = (num) => {
        const dollar = [];
        for (let i = 0; i < num; i++) {
            dollar.push("$");
        }
        return dollar.join("");
    };

    // filtering the list by user text input
    const filteredList = list?.filter(
        (item) =>
            item.title.toLowerCase().match(searchTerm.toLowerCase()) &&
            item.categoryType.match(categoryName)
    );

    // check if idea has been save and will toggle between white and red heart
    const checkIfSaved = (eventId) => {
        return saved.some((item) => item == eventId);
    };

    const headerTitle = {
        restaurants: "Food",
        movies: "Movies",
        attractions: "Attractions",
        events: "Live Entertainments",
    };

    const reviewStarsDisplay = (score, category) => {
        // round the score to a whole number
        let rating = Math.round(+score);

        if (category == "movies") rating /= 2;

        if (rating == 0)
            return (
                <>
                    <img src={reviewStarWhiteOutline} alt="star logo" />
                    <img src={reviewStarWhiteOutline} alt="star logo" />
                    <img src={reviewStarWhiteOutline} alt="star logo" />
                    <img src={reviewStarWhiteOutline} alt="star logo" />
                    <img src={reviewStarWhiteOutline} alt="star logo" />
                </>
            );

        if (rating == 1)
            return (
                <>
                    <img src={reviewStarWhite} alt="star logo" />
                    <img src={reviewStarWhiteOutline} alt="star logo" />
                    <img src={reviewStarWhiteOutline} alt="star logo" />
                    <img src={reviewStarWhiteOutline} alt="star logo" />
                    <img src={reviewStarWhiteOutline} alt="star logo" />
                </>
            );

        if (rating == 2)
            return (
                <>
                    <img src={reviewStarWhite} alt="star logo" />
                    <img src={reviewStarWhite} alt="star logo" />{" "}
                    <img src={reviewStarWhiteOutline} alt="star logo" />
                    <img src={reviewStarWhiteOutline} alt="star logo" />
                    <img src={reviewStarWhiteOutline} alt="star logo" />
                </>
            );

        if (rating == 3)
            return (
                <>
                    <img src={reviewStarWhite} alt="star logo" />
                    <img src={reviewStarWhite} alt="star logo" />
                    <img src={reviewStarWhite} alt="star logo" />
                    <img src={reviewStarWhiteOutline} alt="star logo" />
                    <img src={reviewStarWhiteOutline} alt="star logo" />
                </>
            );

        if (rating == 4)
            return (
                <>
                    <img src={reviewStarWhite} alt="star logo" />
                    <img src={reviewStarWhite} alt="star logo" />
                    <img src={reviewStarWhite} alt="star logo" />
                    <img src={reviewStarWhite} alt="star logo" />
                    <img src={reviewStarWhiteOutline} alt="star logo" />
                </>
            );

        if (rating == 5)
            return (
                <>
                    <img src={reviewStarWhite} alt="star logo" />
                    <img src={reviewStarWhite} alt="star logo" />
                    <img src={reviewStarWhite} alt="star logo" />
                    <img src={reviewStarWhite} alt="star logo" />
                    <img src={reviewStarWhite} alt="star logo" />
                </>
            );
    };

    let clickable = true;
    const right = (e) => {
        if (clickable) {
            clickable = false;
            console.log(e);
            // find the closest carousel and scroll the ul by 500px to the right
            const carouselRef = e.target.closest(".carouselContainer");
            // console.log(carouselRef.firstChild);
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
    };
    const left = (e) => {
        // console.log(e);
        // find the closest carousel and scroll the ul by 500px to the left
        const carouselRef = e.target.closest(".carouselContainer");
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
    };

    return (
        <div className="dateIdeasList">
            {closeNotSignedIn && (
                <div className="catch" onClick={handleClickNotSignInClose}>
                    <div className="notSignedIn">
                        <div className="closeButton">
                            <button onClick={handleClickNotSignInClose}>
                                <img src={x} alt="x icon" id="closeCatch" />
                            </button>
                        </div>
                        <div className="userAuth">
                            <Link
                                to={"/signin"}
                                className="pinkButton userAuthTop"
                            >
                                <p>Sign In</p>
                            </Link>
                            <Link to={"/signup"} className="pinkButton">
                                <p>Sign Up</p>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
            <h2>
                {headerTitle[ideas?.[0]?.categoryType]}{" "}
                {!categoryName && (
                    <span onClick={() => viewAll(ideas?.[0]?.categoryType)}>
                        View all
                    </span>
                )}
            </h2>
            <div className="carouselContainer">
                <ul
                    className={
                        categoryName
                            ? "carouselImageListViewAll"
                            : "carouselImageList"
                    }
                    ref={carouselContent}
                >
                    {filteredList?.map((idea) => {
                        return (
                            <li
                                className="dateIdeasCard"
                                onClick={(e) => selectedEvent(e, idea)}
                                key={idea.id}
                            >
                                <div className="dateIdeaCardHeader">
                                    <button
                                        className={`heart ${
                                            checkIfSaved(idea.id) && "hideHeart"
                                        }`}
                                        onClick={handleClick}
                                    >
                                        <img
                                            src={whiteHeartNoOutline}
                                            className="whiteHeart"
                                            alt="White Heart"
                                            id="save"
                                        />
                                    </button>
                                    <button
                                        className={`heart ${
                                            !checkIfSaved(idea.id) &&
                                            "hideHeart"
                                        }`}
                                        onClick={handleClick}
                                    >
                                        <img
                                            src={redHeart}
                                            className="redHeart"
                                            alt="White Heart"
                                            id="save"
                                        />
                                    </button>
                                    <div className="dateIdeaCardHeaderTitle">
                                        <h3>{idea.title}</h3>
                                    </div>
                                </div>
                                <div className="imageContainer">
                                    <img
                                        src={
                                            idea.img
                                                ? idea.img
                                                : idea.image
                                                ? idea.image[0]
                                                : defaultImagePlaceholderSmall
                                        }
                                        alt={`Image of ${idea.title}`}
                                    />
                                </div>
                                <div className="textContainer">
                                    <p className="city">
                                        {idea.city && idea.city}
                                    </p>
                                    <p className="type">{idea.categoryType}</p>
                                    <p className="price">
                                        {idea.price_range &&
                                            dollarSigns(idea.price_range)}
                                    </p>
                                    <p className="reviewStars">
                                        {idea.rating &&
                                            !idea.votes &&
                                            reviewStarsDisplay(
                                                idea.rating,
                                                idea.categoryType
                                            )}
                                        {idea.votes &&
                                            reviewStarsDisplay(
                                                idea.votes,
                                                idea.categoryType
                                            )}
                                    </p>
                                    <p className="reviewNumbers">
                                        {/* 1,542 reviews */}
                                    </p>
                                </div>
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
                {!categoryName && <></>}
            </div>
        </div>
    );
}

export default DateIdeasList;

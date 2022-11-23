// DateIdeasList.js
import { useState } from "react";
import { useEffect } from "react";
import whiteHeart from "../assets/whiteHeart.svg";
import redHeart from "../assets/redHeart.svg";
import x from "../assets/X.svg";
import defaultImagePlaceholderSmall from "../assets/defaultImagePlaceholderSmall.jpg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import Context from "../context/context";
import reviewStar from "../assets/ReviewStar.svg"
import reviewStarWhite from "../assets/reviewStarWhite.svg"

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

    const context = useContext(Context);

    // useEffect(() => {
    //     // making the object into an array
    //     for (let category in ideas) {
    //         ideas[category].forEach((item) => mainList.push(item));
    //     }

    //     // randomize the list
    //     let mainList2 = mainList.sort(() => Math.random() - 0.5);

    //     // if there is data in the array
    //     if (mainList2.length) {
    //         // if it matches saved and is the first time
    //         if (
    //             mainList2.every((item) => item.categoryType === "saved") &&
    //             context.initialSaved
    //         ) {
    //             // update state and context state
    //             // context.setInitialSavedArray(mainList2);
    //             context.setInitialSaved(false);
    //             //quick fix: save page has to remove date idea when unsaved
    //             setList(mainList2);
    //         // else if it does not match saved and is the first time
    //         } else if (
    //             mainList2.every((item) => item.categoryType !== "saved") &&
    //             context.initialDates
    //         ) {
    //             // update stat and context state
    //             context.setInitialDatesArray(mainList2);
    //             context.setInitialDates(false);
    //             setList(mainList2);
    //         // else if it matches saved
    //         } else if (
    //             mainList2.every((item) => item.categoryType === "saved")
    //         ) {
    //             //set state to context state
    //             //quick fix: save page has to remove date idea when unsaved
    //             setList(mainList2);
    //         // else if it does not match saved
    //         } else if (
    //             mainList2.every((item) => item.categoryType !== "saved")
    //         ) {
    //             // set state to context state
    //             setList(context.initialDatesArray);
    //         // back up just incase something goes wrong
    //         } else {
    //             setList(mainList2);
    //         }
    //     } else {
    //         setList(mainList2)
    //     }
    // }, [ideas]);

    useEffect(() => {
        setList(ideas)
    }, [ideas])
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
        restaurants: 'Food',
        movies: 'Movies',
        attractions: 'Attractions',
        events: 'Live Entertainments',
    }

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
            <h2>{headerTitle[ideas?.[0].categoryType]} {!categoryName && <span onClick={() => viewAll(ideas?.[0].categoryType)}>View all {headerTitle[ideas?.[0].categoryType]}</span>}</h2>
            <div className="dateIdeasContainer wrapper">
                {filteredList?.map((idea) => {
                    return (
                        <div
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
                                        src={whiteHeart}
                                        className="whiteHeart"
                                        alt="White Heart"
                                        id="save"
                                    />
                                </button>
                                <button
                                    className={`heart ${
                                        !checkIfSaved(idea.id) && "hideHeart"
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
                                <h3>{idea.title}</h3>
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
                                <p className='city'>{idea.city && idea.city}</p>
                                <p className='type'>{idea.categoryType}</p>
                                <p className='price'>
                                    {idea.price_range && dollarSigns(idea.price_range)}
                                </p>
                                <p className='reviewStars'>
                                    <img src={reviewStarWhite} alt="star logo" />
                                    <img src={reviewStar} alt="star logo" />
                                    <img src={reviewStar} alt="star logo" />
                                    <img src={reviewStar} alt="star logo" />
                                    <img src={reviewStar} alt="star logo" />
                                </p>

                                <p className='reviewNumbers'>1,542 reviews</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default DateIdeasList;

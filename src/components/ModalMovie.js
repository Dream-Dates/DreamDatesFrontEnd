// Modal.js
import globe from "../assets/globe.svg";
import { Link } from "react-router-dom";
import whiteHeart from "../assets/whiteHeart.svg";
import redHeart from "../assets/redHeart.svg";
import x from "../assets/X.svg";
import clock from "../assets/clock.svg";
import about from "../assets/about.svg";
import phoneIcon from "../assets/phone.svg";
import location from "../assets/location.svg";
import imageIcon from "../assets/image.svg";
import { useState, useEffect } from "react";
import defaultImagePlaceholder from "../assets/defaultImagePlaceholder.jpg";
import Carousel from "./carousel";
import SavePopup from "./SavePopup";
import mixpanel from "mixpanel-browser";
import Reviews from "./Reviews";
import ticket from "../assets/ticket.svg";
import MobileCarousel from "./MobileCarousel";
import reviewStarWhiteOutline from "../assets/reviewStartWhiteOutline.svg";
import reviewStarRed from "../assets/reviewStarRed.svg";
import reviewStarWhite from "../assets/reviewStarWhite.svg";
import ReactPlayer from "react-player/youtube";

function ModalMovie({ eventDetails, closeModal, userId, triggerToggle }) {
    const {
        id,
        type,
        title,
        address_street,
        city,
        country,
        venue,
        price_range,
        link,
        img,
        time,
        description,
        votes,
        price,
        opening_hours,
        website,
        rating,
        image,
        categoryType,
        phone,
        reviews,
        trailer,
        datetime_utc,
    } = eventDetails;

    console.log(reviews);

    const [closeNotSignedIn, setCloseNotSignedIn] = useState(false);
    const [showSavePopup, setShowSavePopup] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");
    const [saved, setSaved] = useState([]);
    const [toggle, setToggle] = useState(false);

    const handleClickModalClose = (e) => {
        if (e.target.className === "modalMovie" || e.target.id === "close") {
            closeModal();
        }
    };

    const handleClickNotSignInClose = (e) => {
        if (e.target.className === "catch" || e.target.id === "closeCatch") {
            setCloseNotSignedIn(!closeNotSignedIn);
        }
    };

    const newLine = (time) => {
        let array = time.split(": ");
        return array;
    };

    const newDateFormat = (time) => {
        const reg = /-/g;
        const reg2 = /:/g;
        const reg3 = /T/g;
        const str = time;
        const adjustedDate = str.replace(reg, " ");
        let dateArray = adjustedDate.split("T");

        dateArray[0] = dateArray[0].substr(5) + " " + dateArray[0].substr(0, 5);

        dateArray[1] = dateArray[1].slice(0, 5);
        return dateArray;
    };

    const reviewStarsDisplay = (score, category) => {
        // round the score to a whole number
        let rating = Math.round(+score);

        // movies rating is out of 10 so we have to divide by 2 and round up
        if (category == "movies") rating = Math.ceil(score / 2);

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

    useEffect(() => {
        const fetchSaved = async () => {
            const response = await fetch(
                "https://dream-dates.heroku.com/dreamdates/saved/dates",
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
    }, [toggle]);

    const handleClickSave = () => {
        if (!userId) {
            // if not signed in the pop up
            setCloseNotSignedIn(!closeNotSignedIn);
        } else {
            fetch("https://dream-dates.heroku.com/dreamdates/saved/dates", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: userId,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.some((item) => item.id == id)) {
                        // if id match then we remove
                        fetch(
                            `https://dream-dates.heroku.com/dreamdates/datingideas/delete/${id}`,
                            {
                                method: "DELETE",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    userid: userId,
                                }),
                            }
                        )
                            .then((res) => res.json())
                            .then((data) => {
                                setToggle(!toggle);
                                triggerToggle();
                            });
                        setShowSavePopup(true);
                        setSaveMessage("Unsaved");
                        setTimeout(() => {
                            setShowSavePopup(false);
                        }, 500);
                    } else {
                        // if id does not match then we save
                        fetch(
                            "https://dream-dates.heroku.com/dreamdates/datingideas/saved",
                            {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    id: id,
                                    type: type,
                                    title: title,
                                    address_street: address_street,
                                    city: city,
                                    country: country,
                                    venue: venue,
                                    price_range: price_range,
                                    link: link,
                                    img: img,
                                    image: image,
                                    time: time,
                                    description: description,
                                    votes: votes,
                                    price: price,
                                    opening_hours: opening_hours,
                                    website: website,
                                    rating: rating,
                                    user_id: userId,
                                    phone: phone,
                                }),
                            }
                        )
                            .then((res) => res.json())
                            .then((data) => {
                                console.log(data);
                                setToggle(!toggle);
                                triggerToggle();
                            });
                        setShowSavePopup(true);
                        setSaveMessage("Saved");
                        setTimeout(() => {
                            setShowSavePopup(false);
                        }, 500);
                    }
                });
            // track every time a date is saved
            mixpanel.init(`${process.env.REACT_APP_MIXPANEL_TOKEN}`, {
                debug: true,
            });
            mixpanel.track("Save/Unsave", {
                userID: userId,
                dateID: eventDetails.id,
                dateTitle: eventDetails.title,
            });
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

    // check if idea has been save and will toggle between white and red heart
    const checkIfSaved = (eventId) => {
        return saved.some((item) => item == eventId);
    };

    // track when the website link is clicked
    const handleClickWebsite = () => {
        mixpanel.init(`${process.env.REACT_APP_MIXPANEL_TOKEN}`, {
            debug: true,
        });
        mixpanel.track("Website Button Clicked", {
            userID: userId,
            dateID: id,
            dateTitle: title,
        });
    };

    // converting utc time
    const utcTime = (utc) => {
        const date = new Date(utc);
        return date.toDateString() + " " + date.toLocaleTimeString();
    };

    return (
        <div className="modalMovie" onClick={handleClickModalClose}>
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

            <div className="modalContainer">
                {/* buttonContainer for Heart and Close */}
                <div className="modalHeader">
                    <div className="heartContainer">
                        <button
                            className={`heart ${
                                checkIfSaved(id) && "hideHeart"
                            }`}
                            onClick={handleClickSave}
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
                                !checkIfSaved(id) && "hideHeart"
                            }`}
                            onClick={handleClickSave}
                        >
                            <img
                                src={redHeart}
                                className="redHeart"
                                alt="White Heart"
                                id="save"
                            />
                        </button>
                    </div>
                    <div className="titleContainer">
                        <h1>{title}</h1>
                    </div>
                    <div className="closeContainer">
                        <button onClick={handleClickModalClose}>
                            <img src={x} alt="x icon" id="close" />
                        </button>
                    </div>
                </div>

                <div className="imageContainer">
                    <img
                        src={
                            img
                                ? img
                                : image
                                ? image[0]
                                : defaultImagePlaceholder
                        }
                        alt={`A photo of ${title}`}
                        className={img && "fullImage"}
                    />
                </div>

                <div className="modalBody">
                    <div className="infoSnippet">
                        <p className="city">{city && city}</p>
                        <p className="type">{type || categoryType}</p>
                        <p className="price">
                            {price_range && dollarSigns(price_range)}
                            {price && price}
                        </p>
                        <p className="reviewStars">
                            {rating &&
                                !votes &&
                                reviewStarsDisplay(rating, categoryType)}
                            {votes && reviewStarsDisplay(votes, categoryType)}
                        </p>

                        <p className="reviewNumbers"></p>
                    </div>

                    <div className="aboutSection">
                        <div className="aboutSectionHeader">
                            <div className="subTitle">
                                {categoryType === "events" ? (
                                    <div className="hoursSection">
                                        <div className="subTitle">
                                            {datetime_utc && (
                                                <>
                                                    <img
                                                        src={clock}
                                                        alt="clock icon"
                                                    />
                                                    <h3>Date</h3>
                                                </>
                                            )}
                                        </div>

                                        <p className="utcTime">
                                            {utcTime(datetime_utc)}
                                        </p>
                                    </div>
                                ) : (
                                    description && (
                                        <>
                                            <img
                                                src={about}
                                                alt="information icon"
                                            />
                                            <h3>About</h3>
                                        </>
                                    )
                                )}
                            </div>
                            <div>
                                <a
                                    href={
                                        categoryType === "movies" ||
                                        categoryType === "events"
                                            ? link
                                            : website
                                    }
                                    className="pinkButton"
                                    target="_blank"
                                >
                                    {categoryType === "movies" ||
                                    categoryType === "events" ? (
                                        <>
                                            <img
                                                src={ticket}
                                                alt="ticket icon"
                                            />
                                            <h3>Find tickets near me</h3>
                                        </>
                                    ) : (
                                        <>
                                            <img src={globe} alt="globe icon" />
                                            <h3>Website</h3>
                                        </>
                                    )}
                                </a>
                            </div>
                        </div>
                        {/* <p>2022 - 1hr 50min</p> */}
                        <p>{description}</p>
                    </div>

                    {/* Restaurant/Attractions */}
                    {(categoryType === "restaurants" ||
                        categoryType === "attractions") && (
                        <div className="additionalInformation">
                            <div className="phoneSection">
                                <div className="subTitle">
                                    {phone && (
                                        <>
                                            <img
                                                src={phoneIcon}
                                                alt="phone icon"
                                            />
                                            <h3>Phone</h3>
                                        </>
                                    )}
                                </div>
                                <p>{phone}</p>
                            </div>
                            <div className="locationSection">
                                <div className="subTitle">
                                    <img src={location} alt="map pin icon" />
                                    <h3>Location</h3>
                                </div>
                                <p>{address_street}</p>
                            </div>
                            <div className="map">
                                <iframe
                                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDoPEmjv8_EPKu_NpowjpIZ_n3O4Ovkp_w&q=${address_street}`}
                                ></iframe>
                            </div>
                            <div className="hoursSection">
                                <div className="subTitle">
                                    {opening_hours && (
                                        <>
                                            <img src={clock} alt="clock icon" />
                                            <h3>Hours</h3>
                                        </>
                                    )}
                                </div>
                                {opening_hours?.map((item) => {
                                    return (
                                        <div className="hoursContainer">
                                            <p>{newLine(item)[0]}</p>
                                            <p>{newLine(item)[1]}</p>
                                        </div>
                                    );
                                })}
                            </div>
                            {categoryType !== "events" && (
                                <div className="carouselSection">
                                    <div className="subTitle">
                                        <img src={imageIcon} alt="image icon" />
                                        <h3>Photos</h3>
                                    </div>
                                    <Carousel
                                        data={image}
                                        location={"modalImage"}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                    {/* LIVE ENTERTAINMENT */}
                    {categoryType === "events" && (
                        <div className="additionalInformation events">
                            <div className="locationSection">
                                <div className="subTitle">
                                    <img src={location} alt="map pin icon" />
                                    <h3>Location</h3>
                                </div>
                                <p>{address_street}</p>
                            </div>
                            <div className="map">
                                <iframe
                                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDoPEmjv8_EPKu_NpowjpIZ_n3O4Ovkp_w&q=${address_street}`}
                                ></iframe>
                            </div>
                        </div>
                    )}
                </div>

                {/* MOVIE */}
                {categoryType === "movies" && (
                    <div className="movieTrailer">
                        {/* <iframe
                            src={trailer}
                            frameborder="0"
                            allowfullscreen
                        ></iframe> */}
                        <ReactPlayer url={trailer} />
                    </div>
                )}

                {reviews && <Reviews reviews={reviews} rating={rating} />}
            </div>

            {showSavePopup && <SavePopup text={saveMessage} />}
        </div>
    );
}

export default ModalMovie;

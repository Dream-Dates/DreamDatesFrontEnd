// Modal.js
import globe from "../assets/globe.svg";
import { Link } from "react-router-dom";
import whiteHeart from "../assets/whiteHeart.svg";
import redHeart from "../assets/redHeart.svg";
import x from "../assets/X.svg";
import clock from "../assets/clock.svg";
import about from "../assets/about.svg";
import phone from "../assets/phone.svg";
import location from "../assets/location.svg";
import imageIcon from "../assets/image.svg";
import { useState, useEffect } from "react";
import defaultImagePlaceholder from "../assets/defaultImagePlaceholder.jpg";
import Carousel from "./carousel";
import SavePopup from "./SavePopup";
import mixpanel from 'mixpanel-browser';

function Modal({ eventDetails, closeModal, userId, triggerToggle }) {
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
    } = eventDetails;

    const [closeNotSignedIn, setCloseNotSignedIn] = useState(false);
    const [showSavePopup, setShowSavePopup] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");
    const [saved, setSaved] = useState([]);
    const [toggle, setToggle] = useState(false);

    const handleClickModalClose = (e) => {
        if (e.target.className === "modal" || e.target.id === "close") {
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
    }, [toggle]);

    const handleClickSave = () => {
        if (!userId) {
            // if not signed in the pop up
            setCloseNotSignedIn(!closeNotSignedIn);
        } else {
            fetch("https://dream-dates.herokuapp.com/dreamdates/saved/dates", {
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
                            `https://dream-dates.herokuapp.com/dreamdates/datingideas/delete/${id}`,
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
                            "https://dream-dates.herokuapp.com/dreamdates/datingideas/saved",
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
            mixpanel.init(
                `${process.env.REACT_APP_MIXPANEL_TOKEN}`,
                {
                    debug: true,
                }
            );
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
    }

    return (
        <div className="modal" onClick={handleClickModalClose}>
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
                <div className="buttonContainer">
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
                    <button onClick={handleClickModalClose}>
                        <img src={x} alt="x icon" id="close" />
                    </button>
                </div>
                <div className="imageContainer">
                    <img
                        src={img ? img : image ? image[0] : defaultImagePlaceholder}
                        alt={`A photo of ${title}`}
                        className={img && "fullImage"}
                    />
                </div>
                <div className="titleContainer">
                    <h1>{title}</h1>
                </div>
                <div className="textContainer">
                    <div className="topSide">
                        <div className="heading">
                            {website && (
                                <a
                                    href={website}
                                    className="pinkButton"
                                    target="_blank"
                                    onClick={handleClickWebsite}
                                >
                                    <img src={globe} alt="globe icon" />{" "}
                                    <p>Website</p>
                                </a>
                            )}
                            {link && (
                                <a
                                    href={link}
                                    className="pinkButton"
                                    target="_blank"
                                    onClick={handleClickWebsite}
                                >
                                    <img src={globe} alt="globe icon" />{" "}
                                    <p>Website</p>
                                </a>
                            )}
                            <h2>
                                {price_range
                                    ? dollarSigns(price_range)
                                    : price
                                    ? price
                                    : " "}
                            </h2>
                            {categoryType === "events" && <h2>Ticket Event</h2>}
                            {categoryType === "movies" && <h2>Movie</h2>}
                            {categoryType === "restaurants" && (
                                <h2>Restaurant</h2>
                            )}
                            {categoryType === "attractions" && (
                                <h2>Attractions</h2>
                            )}
                        </div>
                    </div>
                    <div className="midSide">
                        <div className="leftSide">
                            {description && (
                                <div className="aboutContainer">
                                    <div className="subTitle">
                                        <div className="midIcon">
                                            <img
                                                src={about}
                                                alt="information icon"
                                            />
                                        </div>
                                        <h2>About</h2>
                                    </div>
                                    <p>{description}</p>
                                </div>
                            )}

                            {/* <div className="phoneContainer">
                                <div className="subTitle">
                                    <div className="midIcon">
                                        <img src={phone} alt='phone icon'/>
                                    </div>
                                    <h2>Phone</h2>
                                </div>
                                <p>(123)-456-7890</p>
                            </div> */}

                            {address_street && (
                                <div className="locationContainer">
                                    <div className="subTitle">
                                        <div className="midIcon">
                                            <img
                                                src={location}
                                                alt="map pin icon"
                                            />
                                        </div>
                                        <h2>Location</h2>
                                    </div>
                                    <p>{venue}</p>
                                    <p>{address_street}</p>
                                    <p>{city}</p>
                                </div>
                            )}
                        </div>
                        <div className="rightSide">
                            {opening_hours && (
                                <div className="hoursContainer">
                                    <div className="subTitle">
                                        <div className="midIcon">
                                            <img src={clock} alt="clock icon" />
                                        </div>
                                        <h2>Hours</h2>
                                    </div>
                                    {opening_hours.map((item) => {
                                        return (
                                            <>
                                                {newLine(item).map((each) => {
                                                    return <p>{each}</p>;
                                                })}
                                                {/* <br /> */}
                                            </>
                                        );
                                    })}
                                </div>
                            )}
                            {time && (
                                <div className="hoursContainer">
                                    <div className="subTitle">
                                        <div className="midIcon">
                                            <img src={clock} alt="clock icon" />
                                        </div>
                                        <h2>Date</h2>
                                    </div>
                                    {newDateFormat(time).map((each) => {
                                        return <p>{each}</p>;
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                    {image && (
                        <div className="botSide">
                            <div className="subTitle">
                                <div className="midIcon">
                                    <img src={imageIcon} alt="image icon" />
                                </div>
                                <h2>Photos</h2>
                            </div>
                            <Carousel data={image} />
                        </div>
                    )}
                </div>
            </div>

            {showSavePopup && <SavePopup text={saveMessage} />}
        </div>
    );
}

export default Modal;

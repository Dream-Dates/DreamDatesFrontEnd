// Header.js
// import logo from "../assets/dreamDatesLogo.png";
import logo from "../assets/dreamDatesLogoNobelFont.svg";
import logoMobile from "../assets/logoMobile.png";
import redHeart from "../assets/redHeart.svg";
import profileIcon from "../assets/profileIcon.svg";
import magnifyingGlass from "../assets/magnifyingGlass.svg";
import homeIcon from "../assets/homeIcon.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import Context from "../context/context";
import mixpanel from "mixpanel-browser";
import { useEffect } from "react";

function Header({
    user,
    logUserOut,
    getSearchTerm,
    getCategoryName,
    categoryName,
}) {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [showDropDown, setShowDropDown] = useState(false);

    const context = useContext(Context);

    // to get the category name form view all button so we can toggle the css color change for button
    useEffect(() => {
        setSelectedCategory(categoryName);
    }, [categoryName]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        getSearchTerm(e, e.target.value);
    };

    const navigate = useNavigate();

    const handleClickHome = (e) => {
        setSearchTerm("");
        setSelectedCategory("");
        getSearchTerm(e, "");
        getCategoryName("");
        navigate("/");
    };

    const handleClickSaved = (e) => {
        setSearchTerm("");
        setSelectedCategory("");
        getSearchTerm(e, "");
        getCategoryName("");
        navigate("/saved");
    };

    const handleClickButtons = (e) => {
        if (e.target.tagName === "BUTTON") {
            // if they match that means it is already currently selected
            if (selectedCategory == e.target.id.toLowerCase()) {
                getCategoryName("");
                setSelectedCategory("");
            } else {
                getCategoryName(e.target.id);
                setSelectedCategory(e.target.id);

                // track every time a category is clicked
                mixpanel.init(`${process.env.REACT_APP_MIXPANEL_TOKEN}`, {
                    debug: true,
                });
                mixpanel.track("Category Viewed", {
                    userID: user.id,
                    categoryName: e.target.id.toLowerCase(),
                });
            }
        } else {
            // if they match that means it is already currently selected
            if (selectedCategory == e.target.parentElement.id.toLowerCase()) {
                getCategoryName("");
                setSelectedCategory("");
            } else {
                getCategoryName(e.target.parentElement.id);
                setSelectedCategory(e.target.parentElement.id);

                // track every time a category is clicked
                mixpanel.init(`${process.env.REACT_APP_MIXPANEL_TOKEN}`, {
                    debug: true,
                });
                mixpanel.track("Category Viewed", {
                    userID: user.id,
                    categoryName: e.target.parentElement.id.toLowerCase(),
                });
            }
        }
        navigate("/");
    };

    const handleClickSearchBar = () => {
        console.log("search bar", context.pageIs);
        mixpanel.init(`${process.env.REACT_APP_MIXPANEL_TOKEN}`, {
            debug: true,
        });
        mixpanel.track("Search Bar Clicked", {
            userID: user.id,
            location: context.pageIs,
        });
    };

    const handleClickProfile = (e) => {
        console.log(e);
        if (
            e.target.className === "pinkButton" ||
            e.target.id === "profileIcon" ||
            e.target.tagName === "A" ||
            e.target.parentElement.tagName === "A"
        ) {
            setShowDropDown(!showDropDown);
        }
    };

    return (
        <div className="header">
            <div className="headerNormal">
                <div className="headerNormalTop wrapper">
                    <div className="headerLogo">
                        <Link to="/" onClick={handleClickHome}>
                            <img
                                src={logo}
                                alt="DreamDates Logo"
                                className="logoNormal"
                            />
                            <img
                                src={logoMobile}
                                alt="DreamDates Logo"
                                className="logoMobile"
                            />
                        </Link>
                    </div>
                    <form
                        className="headerSearchBar"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <label htmlFor="search" className="sr-only">
                            Search for
                        </label>
                        {context.pageIs === "home" ? (
                            <input
                                type="text"
                                name="search"
                                id="search"
                                placeholder="Search for Food, Movies, Active..."
                                onChange={handleChange}
                                value={searchTerm}
                                onClick={handleClickSearchBar}
                            />
                        ) : (
                            <input
                                type="text"
                                name="search"
                                id="search"
                                placeholder="Search Saved Ideas"
                                onChange={handleChange}
                                value={searchTerm}
                                onClick={handleClickSearchBar}
                            />
                        )}
                        <div className="magnifyingGlass">
                            <img src={magnifyingGlass} alt="magnifying glass" />
                        </div>
                    </form>

                    <div className="homeSavedButtons">
                        {context.pageIs === "home" ? (
                            <Link
                                to="/saved"
                                onClick={handleClickSaved}
                                className={`pinkButton ${
                                    !user.token && "disable-link"
                                }`}
                            >
                                <img src={redHeart} alt="red heart" />
                                <span className="normalView">Saved</span>
                            </Link>
                        ) : (
                            <Link
                                to="/"
                                onClick={handleClickHome}
                                className="pinkButton"
                            >
                                <img src={homeIcon} alt="home icon" />
                                <span className="normalView">Home</span>
                            </Link>
                        )}
                    </div>

                    {/* regular view userAuth */}
                    {user.token ? (
                        <div className="userAuth">
                            <p className="welcome">
                                Welcome back, {user.name}!
                            </p>
                            <span className="br" />
                            <Link
                                to="/"
                                onClick={logUserOut}
                                className="signOut"
                            >
                                Sign out
                            </Link>
                        </div>
                    ) : (
                        <div className="userAuth flexAlignCenter">
                            <Link to={"/signin"} className="pinkButton">
                                Sign In
                            </Link>
                        </div>
                    )}

                    {/* mobile view */}
                    <div className="userAuthMobile">
                        <div>
                            <button
                                className="pinkButton"
                                onClick={handleClickProfile}
                            >
                                <img
                                    src={profileIcon}
                                    alt="profile icon"
                                    id="profileIcon"
                                />
                                <div
                                    className={`profile ${
                                        showDropDown && "showDropDown"
                                    }`}
                                >
                                    <div className="triangleHatOutline">
                                        <div className="triangleHatBody"></div>
                                    </div>
                                    <div className="profileContainer">
                                        {user.token ? (
                                            <div className="profileBody">
                                                <p className="welcome">
                                                    Welcome back, {user.name}!
                                                </p>
                                                <br />
                                                <br />
                                                <Link
                                                    to="/"
                                                    onClick={logUserOut}
                                                    className="signOut"
                                                >
                                                    Sign out
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="profileBody">
                                                <div className="signInSignUp">
                                                    <Link
                                                        to="/signin"
                                                        className="pinkButton userAuthTop"
                                                    >
                                                        <p>Sign In</p>
                                                    </Link>
                                                    <Link
                                                        to={"/signup"}
                                                        className="pinkButton"
                                                    >
                                                        Sign Up
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div></div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="headerNormalBottom">
                    <div className="headerFilter">
                        <div>
                            <button
                                id="restaurants"
                                onClick={handleClickButtons}
                                className={`pinkButton ${
                                    selectedCategory == "restaurants" &&
                                    "selectedCategory"
                                }`}
                            >
                                Food
                            </button>
                        </div>
                        <div>
                            <button
                                id="movies"
                                onClick={handleClickButtons}
                                className={`pinkButton ${
                                    selectedCategory == "movies" &&
                                    "selectedCategory"
                                }`}
                            >
                                Movies
                            </button>
                        </div>
                        {/* <div>
                            <button
                                id="active"
                                onClick={handleClickButtons}
                                className={`pinkButton disable-link ${
                                    selectedCategory == "active" &&
                                    "selectedCategory"
                                }`}
                            >
                                Active
                            </button>
                        </div> */}
                        <div>
                            <button
                                id="attractions"
                                onClick={handleClickButtons}
                                className={`pinkButton ${
                                    selectedCategory == "attractions" &&
                                    "selectedCategory"
                                }`}
                            >
                                Attractions
                            </button>
                        </div>
                        <div>
                            <button
                                id="events"
                                onClick={handleClickButtons}
                                className={`pinkButton ${
                                    selectedCategory == "events" &&
                                    "selectedCategory"
                                }`}
                            >
                                Live Entertainment
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MOBILE */}
            {/* <div className="headerMobile wrapper">
                <div className="logo">
                    <Link to="/" onClick={handleClickHome}>
                        <img src={logoMobile} alt="DreamDates Logo" />
                    </Link>
                </div>

                <form
                    className="headerSearchBar"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <label htmlFor="search" className="sr-only">
                        Search for
                    </label>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search"
                        onChange={handleChange}
                        value={searchTerm}
                        onClick={handleClickSearchBar}
                    />
                    <div className="magnifyingGlass">
                        <img src={magnifyingGlass} alt="magnifying glass" />
                    </div>
                </form>
                <div className="headerFilter">
                    <div>
                        <button
                            id="restaurants"
                            onClick={handleClickButtons}
                            className={`pinkButton ${
                                selectedCategory == "restaurants" &&
                                "selectedCategory"
                            }`}
                        >
                            <p>Food</p>
                        </button>
                    </div>
                    <div>
                        <button
                            id="movies"
                            onClick={handleClickButtons}
                            className={`pinkButton ${
                                selectedCategory == "movies" &&
                                "selectedCategory"
                            }`}
                        >
                            <p>Movies</p>
                        </button>
                    </div>
                    <div>
                        <button
                            id="active"
                            onClick={handleClickButtons}
                            className={`pinkButton disable-link ${
                                selectedCategory == "active" &&
                                "selectedCategory"
                            }`}
                        >
                            <p>Active</p>
                        </button>
                    </div>
                    <div>
                        <button
                            id="attractions"
                            onClick={handleClickButtons}
                            className={`pinkButton ${
                                selectedCategory == "attractions" &&
                                "selectedCategory"
                            }`}
                        >
                            <p>Attractions</p>
                        </button>
                    </div>
                    <div>
                        <button
                            id="events"
                            onClick={handleClickButtons}
                            className={`pinkButton ${
                                selectedCategory == "events" &&
                                "selectedCategory"
                            }`}
                        >
                            <p>Live Entertainment</p>
                        </button>
                    </div>
                </div>
                <div className="headerRightSide">
                    <div className="savedButton">
                        {context.pageIs === "home" ? (
                            <Link
                                to="/saved"
                                onClick={handleClickSaved}
                                className={`pinkButton ${
                                    !user.token && "disable-link"
                                }`}
                            >
                                <img src={redHeart} alt="red heart" />
                            </Link>
                        ) : (
                            <Link
                                to="/"
                                onClick={handleClickHome}
                                className="pinkButton"
                            >
                                <img src={homeIcon} alt="home icon" />
                            </Link>
                        )}
                    </div>

                    <div className="userAuth">
                        <button
                            className="pinkButton"
                            onClick={handleClickProfile}
                        >
                            <img
                                src={profileIcon}
                                alt="profile icon"
                                id="profileIcon"
                            />
                            <div
                                className={`profile ${
                                    showDropDown && "showDropDown"
                                }`}
                            >
                                <div className="triangleHatOutline">
                                    <div className="triangleHatBody"></div>
                                </div>

                                <div className="profileContainer">
                                    {user.token ? (
                                        <div className="profileBody">
                                            <p className="welcome">
                                                Welcome back, {user.name}!
                                            </p>
                                            <br />
                                            <Link
                                                to="/"
                                                onClick={logUserOut}
                                                className="signOut"
                                            >
                                                <p>Sign out</p>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="profileBody">
                                            <div className="signInSignUp">
                                                <Link
                                                    to="/signin"
                                                    className="pinkButton userAuthTop"
                                                >
                                                    <p>Sign In</p>
                                                </Link>
                                                <Link
                                                    to={"/signup"}
                                                    className="pinkButton"
                                                >
                                                    <p>Sign Up</p>
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </button>
                    </div>
                    <div className="userAuth"></div>
                </div>
            </div> */}
        </div>
    );
}

export default Header;

// Header.js
import logo from "../assets/dreamDatesLogo.png";
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

function Header({ user, logUserOut, getSearchTerm, getCategoryName }) {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const context = useContext(Context);

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

    return (
        <div className="header">
            <div className="headerNormal wrapper">
                <div className="logo">
                    <Link to="/" onClick={handleClickHome}>
                        <img src={logo} alt="DreamDates Logo" />
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
                        />
                    ) : (
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search Saved Ideas"
                            onChange={handleChange}
                            value={searchTerm}
                        />
                    )}
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
                                <p>Saved</p>
                            </Link>
                        ) : (
                            <Link
                                to="/"
                                onClick={handleClickHome}
                                className="pinkButton"
                            >
                                <img src={homeIcon} alt="home icon" />
                                <p>Home</p>{" "}
                            </Link>
                        )}
                    </div>

                    {user.token ? (
                        <div className="userAuth">
                            <p className="welcome">
                                Welcome back, {user.name}!
                            </p>
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
                        <div className="userAuth">
                            <Link to={"/signin"} className="pinkButton">
                                <p>Sign In</p>
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* MOBILE */}
            <div className="headerMobile wrapper">
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
                            className="pinkButton"
                        >
                            <p>Food</p>
                        </button>
                    </div>
                    <div>
                        <button
                            id="movies"
                            onClick={handleClickButtons}
                            className="pinkButton"
                        >
                            <p>Movies</p>
                        </button>
                    </div>
                    <div>
                        <button
                            id="active"
                            onClick={handleClickButtons}
                            className="pinkButton disable-link"
                        >
                            <p>Active</p>
                        </button>
                    </div>
                    <div>
                        <button
                            id="attractions"
                            onClick={handleClickButtons}
                            className="pinkButton"
                        >
                            <p>Attractions</p>
                        </button>
                    </div>
                    <div>
                        <button
                            id="events"
                            onClick={handleClickButtons}
                            className="pinkButton"
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
                        <div className="pinkButton">
                            <img src={profileIcon} alt="" />
                            <div className="profile">
                                {user.token ? (
                                    <div className="profileContainer">
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
                                    <div className="profileContainer">
                                        <Link
                                            to="/signin"
                                            className="pinkButton"
                                        >
                                            <p>Sign In</p>
                                        </Link>
                                        <Link
                                            to={"/signup"}
                                            className="pinkButton"
                                        >
                                            <p>Sign Up</p>
                                        </Link>
                                        <br />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="userAuth"></div>
                </div>
            </div>
        </div>
    );
}

export default Header;

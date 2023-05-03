import DateIdeas from "./components/DateIdeas";
import Header from "./pages/Header";
import SignUp from "./pages/SignUp";
import "./styles/styles.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import { useState } from "react";
import ContextProvider from "../src/context/contextProvider";
import { useEffect } from "react";
import Saved from "./pages/Saved";
// import mixpanel from "mixpanel-browser";

function App() {
    const [user, setUser] = useState({
        token: null,
        id: null,
        name: null,
    });
    const [toggle, setToggle] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [localStorageFinished, setLocalStorageFinished] = useState(false);
    const [showProfileDropDown, setShowProfileDropDown] = useState(false);

    // // track how many times homepage is visited
    // useEffect(() => {
    //     mixpanel.init(`${process.env.REACT_APP_MIXPANEL_TOKEN}`, {
    //         debug: true,
    //     });
    //     mixpanel.track("Page Visit", {
    //         userID: user.id,
    //         pageLocation: "homepage",
    //     });
    // }, []);

    const rerender = () => {
        setToggle(!toggle);
    };

    // store info locally
    useEffect(() => {
        setUser({
            token: localStorage.token,
            id: localStorage.id,
            name: localStorage.name,
        });
        // this is for the mixpanel in DateIdeas.js, it was tracking on render and the rerender when user was updated. With this it does not track the initial render because localStorageFinished is false
        setLocalStorageFinished(true);
    }, [toggle]);

    // clear info when logged out
    const logUserOut = (e) => {
        setUser({
            token: null,
            id: null,
            name: null,
        });

        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("name");
    };

    // grabbing text input from header
    const getSearchTerm = (e, term) => {
        e.preventDefault();
        setSearchTerm(term);
    };

    // grabbing which category was clicked
    const getCategoryName = (categoryNameName) => {
        setCategoryName(categoryNameName);
    };

    // grab the category which view all was clicked on homepage
    const viewAll = (categoryName) => {
        setCategoryName(categoryName);
    };

    const handleClickProfile = (e) => {
        console.log(e);
        // console.log(!e.target.className.include("doNotTriggerProfilePopUp"));
        if (
            (e.target.className === "pinkButton" ||
                e.target.id === "profileIcon" ||
                e.target.tagName === "A" ||
                e.target.parentElement.tagName === "A") &&
            !e.target.className.includes("doNotTriggerProfilePopUp")
        ) {
            setShowProfileDropDown(!showProfileDropDown);
        } else {
            setShowProfileDropDown(false);
        }
    };

    return (
        <div className="App" onClick={handleClickProfile}>
            <ContextProvider>
                <Header
                    user={user}
                    logUserOut={logUserOut}
                    getSearchTerm={getSearchTerm}
                    getCategoryName={getCategoryName}
                    categoryName={categoryName}
                    showProfileDropDown={showProfileDropDown}
                />

                <Routes>
                    <Route
                        path="/"
                        element={
                            <DateIdeas
                                userId={user.id}
                                searchTerm={searchTerm}
                                categoryName={categoryName}
                                localStorageFinished={localStorageFinished}
                                viewAll={viewAll}
                            />
                        }
                    />
                    <Route
                        path="/signup"
                        element={<SignUp rerender={rerender} />}
                    />
                    <Route
                        path="/signin"
                        element={<SignIn rerender={rerender} />}
                    />
                    <Route
                        path="/saved"
                        element={
                            <Saved
                                userId={user.id}
                                searchTerm={searchTerm}
                                categoryName={categoryName}
                            />
                        }
                    />
                </Routes>
            </ContextProvider>
        </div>
    );
}

export default App;

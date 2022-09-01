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

function App() {
    const [user, setUser] = useState({
        token: null,
        id: null,
        name: null,
    });
    const [toggle, setToggle] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryName, setCategoryName] = useState("");

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

    return (
        <div className="App">
            <ContextProvider>
                <Header
                    user={user}
                    logUserOut={logUserOut}
                    getSearchTerm={getSearchTerm}
                    getCategoryName={getCategoryName}
                />

                <Routes>
                    <Route
                        path="/"
                        element={
                            <DateIdeas
                                userId={user.id}
                                searchTerm={searchTerm}
                                categoryName={categoryName}
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

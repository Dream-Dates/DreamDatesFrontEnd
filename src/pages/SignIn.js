// SignIn.js
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function SignIn({ rerender }) {
    const navigate = useNavigate();
    const [signIn, setSignIn] = useState({
        email: "",
        password: "",
    });
    const [mistakeMessage, setMistake] = useState(null);

    const handleChange = (e) => {
        const newData = { ...signIn };
        newData[e.target.id] = e.target.value;
        setSignIn(newData);
    };

    const signInUser = async (e) => {
        e.preventDefault();

        const response = await fetch(
            "https://dream-dates.herokuapp.com/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: signIn.email,
                    password: signIn.password,
                }),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.errorMessage) {
                    setMistake(data.errorMessage);
                }
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("id", data.getUser[0].id);
                    localStorage.setItem("name", data.getUser[0].name);
                    rerender();
                    navigate("/");
                }
            })
            .then(()=>{
                console.log('then')
            })
            console.log('last')
            ;
        return false;
    };

    return (
        <div className="signIn">
            <form onSubmit={(e) => signInUser(e)}>
                <h4 className="errorMessage">{mistakeMessage}</h4>
                <label className="sr-only" htmlFor="firstName">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={(e) => handleChange(e)}
                    value={signIn.email}
                    autoFocus
                    autofocus
                />
                <label className="sr-only" htmlFor="password1">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                    onChange={(e) => handleChange(e)}
                    value={signIn.password}
                />
                <div className="formButtonContainer">
                    <button className="pinkButton">
                        <p>Sign In</p>
                    </button>
                </div>
            </form>

            <div className="signInBottom">
                <p>Don't have an account?</p>
                <Link to={"/signup"} className="pinkButton">
                    <p>Sign Up</p>
                </Link>
            </div>
        </div>
    );
}

export default SignIn;

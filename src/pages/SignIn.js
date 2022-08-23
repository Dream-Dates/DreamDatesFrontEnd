// SignIn.js
import { Link, useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import Context from "../context/context";

function SignIn({rerender}) {
    const context = useContext(Context);
    console.log(context)

    const navigate = useNavigate()
    const [signIn, setSignIn] = useState({
        email: '',
        password: ''
    })
    const [mistakeMessage, setMistake] = useState(null)
    const handleChange = (e) => {
        const newdata = { ...signIn }
        newdata[e.target.id] = e.target.value
        setSignIn(newdata)
        console.log(newdata)

    }

    const signInUser = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:4000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "email": signIn.email,
                "password": signIn.password
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.errorMessage) {
                    setMistake(data.errorMessage)
                }
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("id", data.getUser[0].id);
                    localStorage.setItem("name", data.getUser[0].name);
                    let id = data.getUser[0].id
                    let email = data.getUser[0].email
                    let name = data.getUser[0].name
                    let lastname = data.getUser[0].last_name
                    setUserInfo(id, email, name, lastname)
                    rerender()
                    navigate("/")
                }
            })
        return false
    }
    function setUserInfo(id, email, name, lastname) {
        context.setUserId(id)
        context.setEmail(email)
        context.setName(name)
        context.setLastName(lastname)
        console.log("work")
    }
    return (
        <div className="signIn">
            <form onSubmit={(e) => signInUser(e)}>
                <label className="sr-only" htmlFor="firstName">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={(e) => handleChange(e)}
                    value={signIn.email}
                />
                <label className="sr-only" htmlFor="password1">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                    onChange={(e) => handleChange(e)}
                    value={signIn.password}
                />
                <h3 className="errormessage">{mistakeMessage}</h3>
                <div className="formButtonContainer">
                    <button className="pinkButton"><p>Sign In</p></button>
                </div>
            </form>

            <div className="signInBottom">
                <p>Don't have an account?</p>
                <Link to={'/signup'} className="pinkButton">
                    <p>Sign Up</p>
                </Link>
            </div>
        </div>
    )
}


export default SignIn
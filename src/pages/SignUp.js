// SignUp.js
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function SignUp() {
    let navigate = useNavigate()
    const [signUp, setSignUp] = useState({
        name: '',
        last_name: '',
        email: '',
        password: '',
        retypePassword: ""
    })
    const [mistakeMessage, setMistake] = useState(null)


    const handleChange = (e) => {
        const newdata = { ...signUp }
        newdata[e.target.id] = e.target.value
        setSignUp(newdata)
        console.log(newdata)

    }

    const createUser = async (e) => {
        e.preventDefault();

        const response = await fetch("https://dream-dates.herokuapp.com/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "name": signUp.name,
                "email": signUp.email,
                "lastname": signUp.last_name,
                "password": signUp.password
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.errorMessage) {
                    setMistake(data.errorMessage)
                }
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    console.log("didnt")
                    navigate("/")
                }

            })

        return false
    }

    return (
        <div className="signUp">
            <form onSubmit={(e) => createUser(e)} >
                <section>
                    <label className="sr-only" htmlFor="firstName">First Name</label>
                    <input
                        onChange={(e) => handleChange(e)}
                        type="text"
                        id="name"
                        name="name"
                        placeholder="First name"
                        required
                        value={signUp.name}
                    />
                    <label className="sr-only" htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="last_name"
                        name="lastName"
                        placeholder="Last Name"
                        required
                        onChange={(e) => handleChange(e)}
                        value={signUp.last_name}
                    />
                </section>
                <label className="sr-only" htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={(e) => handleChange(e)}
                    value={signUp.email}
                />
                <label className="sr-only" htmlFor="password1">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password1"
                    placeholder="Password"
                    required
                    onChange={(e) => handleChange(e)}
                    value={signUp.password}
                />
                <label className="sr-only" htmlFor="password2">Retype-Password</label>
                <input
                    type="password"
                    id="retypePassword"
                    name="retypePassword"
                    placeholder="Confirm Password"
                    required
                    onChange={(e) => handleChange(e)}
                    value={signUp.retypePassword}
                />
                <h3 className="errormessage">{mistakeMessage}</h3>
                <div className="formButtonContainer">
                    <button className="pinkButton">Sign Up</button>
                </div>
            </form>

            <div className="signUpBottom">
                <p>Already have an account?</p>
                <Link to={'/signin'} className="pinkButton">
                    <p>Sign in</p>
                </Link>
            </div>
        </div>
    )
}

export default SignUp
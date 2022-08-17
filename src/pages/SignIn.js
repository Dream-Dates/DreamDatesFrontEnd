// SignIn.js
import { Link } from "react-router-dom"
import { useState } from "react"

function SignIn({setToken}) {
    const [signInForm, setSignInForm] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const itemName = e.target.name;
        const itemValue = e.target.value;

        setSignInForm({... signInForm, [itemName]: itemValue})
    }

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return (
        <div className="signIn">
            <form action="">
                <label className="sr-only" htmlFor="firstName">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                onChange={handleChange}
                value={signInForm.email}
                />
                <label className="sr-only" htmlFor="password1">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                onChange={handleChange}
                value={signInForm.password}
                />
                <div className="formButtonContainer">
                    <button className="pinkButton">Sign In</button>
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
// SignUp.js
import { useState } from "react"
import { Link } from "react-router-dom"

function SignUp() {
    const [signUpForm, setSignUpForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password1: '',
        password2: ''
    })

    const handleChange = (e) => {
        const itemName = e.target.name;
        const itemValue = e.target.value;

        setSignUpForm({...signUpForm, [itemName]: itemValue})
    }

    return (
        <div className="signUp">
            <form action="/register" method="POST">
                <section>
                    <label className="sr-only" htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        required
                        onChange={handleChange}
                        value={signUpForm.firstName}
                    />
                    <label className="sr-only" htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        required
                        onChange={handleChange}
                        value={signUpForm.lastName}
                    />
                </section>
                <label className="sr-only" htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={handleChange}
                    value={signUpForm.email}
                />
                <label className="sr-only" htmlFor="password1">Password</label>
                <input
                    type="password"
                    id="password1"
                    name="password1"
                    placeholder="Password"
                    required
                    onChange={handleChange}
                    value={signUpForm.password1}
                />
                <label className="sr-only" htmlFor="password2">Password</label>
                <input
                    type="password"
                    id="password2"
                    name="password2"
                    placeholder="Confirm Password"
                    required
                    onChange={handleChange}
                    value={signUpForm.password2}
                />
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
// SignUp.js
import { Link } from "react-router-dom"

function SignUp() {
    return (
        <div className="signUp">
            <form action="">
                <label className="sr-only" htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    required
                    // onChange={}
                    // value={}
                />
                <label className="sr-only" htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    required
                    // onChange={}
                    // value={}
                />
                <label className="sr-only" htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    // onChange={}
                    // value={}
                />
                <label className="sr-only" htmlFor="password1">Password</label>
                <input
                    type="password"
                    id="password1"
                    name="password1"
                    placeholder="Password"
                    required
                    // onChange={}
                    // value={}
                />
                <label className="sr-only" htmlFor="password2">Password</label>
                <input
                    type="password"
                    id="password2"
                    name="password2"
                    placeholder="Password"
                    required
                    // onChange={}
                    // value={}
                />
                <input type="button" value='Sign Up'/>
            </form>

            <div>
                <p>Already have an account?</p>
                <Link to={'/signin'}>Sign in</Link>
            </div>
        </div>
    )
}

export default SignUp
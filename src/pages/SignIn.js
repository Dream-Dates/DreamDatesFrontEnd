// SignIn.js
import { Link } from "react-router-dom"

function SignIn() {
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
                // onChange={}
                // value={}
                />
                <label className="sr-only" htmlFor="password1">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                // onChange={}
                // value={}
                />
                <input type="button" value='Sign In'/>
            </form>

            <div>
                <p>Don't have an account?</p>
                <Link to={'/signup'}>Sign Up</Link>
            </div>
        </div>
    )
}

export default SignIn
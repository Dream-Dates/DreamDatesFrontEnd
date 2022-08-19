// SignIn.js
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

function SignIn({setToken}) {
    const navigate = useNavigate()
    const [signIn, setSignIn] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const newdata = {...signIn}
        newdata[e.target.id] = e.target.value
        setSignIn(newdata)
        console.log(newdata)

    }

    const signInUser = async (e) =>{
        e.preventDefault();
            const response = await fetch("http://localhost:4000/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                "email": signIn.email,
                "password": signIn.password
              })
            }).then(res => res.json())
            .then(data => console.log(data))
        const parseRes = await response.json()
            localStorage.setItem("token", parseRes.token);
            navigate("http://localhost:3000/home")
            console.log("didnt")
       console.log("work")
    }


    const handleSubmit = (e) => {
        e.preventDefault();

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
                onChange={handleChange}
                value={signIn.email}
                />
                <label className="sr-only" htmlFor="password1">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                onChange={handleChange}
                value={signIn.password}
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
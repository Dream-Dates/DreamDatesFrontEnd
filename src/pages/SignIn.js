// SignIn.js
import { Link, useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import Context from "../context/context";

function SignIn({setToken}) {
    const context = useContext(Context);
    console.log(context)

    const navigate = useNavigate()
    const [signIn, setSignIn] = useState({
        email: '',
        password: ''
    })
    const [mistakeMessage,setMistake] = useState(null)
    const handleChange = (e) => {
        const newdata = {...signIn}
        newdata[e.target.id] = e.target.value
        setSignIn(newdata)
        console.log(newdata)

    }

const signInUser = async (e) =>{
    e.preventDefault();

            const response = await fetch("https://dream-dates.herokuapp.com/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                "email": signIn.email,
                "password": signIn.password
              })
            }).then(res => res.json())
            .then(data => {
                if(data.errorMessage){
                    setMistake(data.errorMessage)
                }
                if(data.token){
             localStorage.setItem("token", data.token);
              localStorage.setItem("id", data.getUser[0].id);
        context.setUserId(data.getUser[0].id)
        context.setEmail(data.getUser[0].email)
        context.setName(data.getUser[0].name)
        context.setLastName(data.getUser[0].last_name)
        console.log(context)
         navigate("/")    
                }
            })
            return false
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
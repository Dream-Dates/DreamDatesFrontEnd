// Header.js
import logo from '../assets/dreamDatesLogo.png'
import redHeart from '../assets/redHeart.svg';
import magnifyingGlass from '../assets/magnifyingGlass.svg';
import { Link } from "react-router-dom"
import { useState, useContext } from 'react';
import Context from "../context/context";


function Header({user, logUserOut}) {
    // const [user, setUser] = useState([])

    const context = useContext(Context);


    return (
        <div className="header wrapper">
            <div className="logo">
                <Link to='/'><img src={logo} alt="DreamDates Logo" /></Link>
            </div>
            
            <form className="headerSearchBar">
                    <label htmlFor="search" className="sr-only">Search for</label>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search for Food, Movies, Active..."
                        // onChange={}
                        // value={}
                    />
                    <div className="magnifyingGlass">
                        <img src={magnifyingGlass} alt="magnifying glass" />
                    </div>
            </form>

            <div className='headerFilter'>
                <div>
                    <button htmlFor="food" className="pinkButton"><p>Food</p></button>
                </div>
                <div>
                    <button htmlFor="movies" className="pinkButton"><p>Movies</p></button>
                </div>
                <div>
                    <button htmlFor="active" className="pinkButton"><p>Active</p></button>
                </div>
                <div>
                    <button htmlFor="attractions" className="pinkButton"><p>Attractions</p></button>
                </div>
                <div>
                    <button htmlFor="liveEntertainment" className="pinkButton"><p>Live Entertainment</p></button>
                </div>
            </div>

            <div className="headerRightSide">
                <div className="savedButton">
                    <Link to='/saved' className={`pinkButton ${!user.token && 'disable-link'}`}>
                        <img src={redHeart} alt="red heart" />
                        <p>Saved</p>
                    </Link>
                </div>

                {/* <div className="userAuth"> */}
                    {user.token ?
                        <div className="userAuth">
                            <p className='welcome'>Welcome back, {user.name}</p>
                            <br />
                            <Link to='/' onClick={logUserOut} className="signOut">Sign out</Link>
                        </div>
                    :
                        <div className="userAuth">
                            <Link to={'/signin'} className="pinkButton">
                                <p>Sign In</p>
                            </Link>
                        </div>
                    }
                {/* </div> */}

                {/* {user &&
                    <div className='signOut'>
                        <Link to='/' onClick={() => setUser(!user)}>Sign out</Link>
                    </div>
                } */}
            </div>
        </div>
    )
}

export default Header
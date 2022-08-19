// Header.js
import logo from '../assets/dreamDatesLogo.png'
import redHeart from '../assets/redHeart.svg';
import magnifyingGlass from '../assets/magnifyingGlass.svg';
import { Link } from "react-router-dom"
import { useState } from 'react';


function Header() {
    const [user, setUser] = useState(true)

    return (
        <div className="header wrapper">
            <div className="logo">
                <Link to='/'><img src={logo} alt="DreamDates Logo" /></Link>
            </div>
            
            <form className="headerSearchBar">
                    <div className="magnifyingGlass">
                        <img src={magnifyingGlass} alt="magnifying glass" />
                    </div>
                    <label htmlFor="search" className="sr-only">Search for</label>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search for movies, restaurants, active"
                        // onChange={}
                        // value={}
                    />
            </form>

            <div className='headerFilter'>
                <div>
                    <button htmlFor="food" className="pinkButton">Food</button>
                </div>
                <div>
                    <button htmlFor="movies" className="pinkButton">Movies</button>
                </div>
                <div>
                    <button htmlFor="active" className="pinkButton">Active</button>
                </div>
                <div>
                    <button htmlFor="attractions" className="pinkButton">Attractions</button>
                </div>
                <div>
                    <button htmlFor="liveEntertainment" className="pinkButton">Live Entertainment</button>
                </div>
            </div>

            <div className="headerRightSide">
                <div className="saved">
                    <Link to='/' className="pinkButton">
                        <img src={redHeart} alt="red heart" />
                        <p>Saved</p>
                    </Link>
                </div>

                {/* <div className="userAuth"> */}
                    {user ?
                        <div className="userAuth">
                            <p className='welcome'></p>
                            <br />
                            <Link to='/' onClick={() => setUser(!user)} className="signOut">Sign out</Link>
                        </div>
                    :
                        <div className="userAuth">
                            <Link to={'/signin'} className="pinkButton" onClick={() => setUser(!user)}>
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
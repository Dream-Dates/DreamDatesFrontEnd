// Header.js
import logo from '../assets/dreamDatesLogo.png'
import logoMobile from '../assets/logoMobile.png'
import redHeart from '../assets/redHeart.svg';
import profileIcon from '../assets/profileIcon.svg';
import magnifyingGlass from '../assets/magnifyingGlass.svg';
import { Link, useNavigate } from "react-router-dom"
import { useState, useContext } from 'react';
import Context from "../context/context";


function Header({ user, logUserOut, getSearchTerm, getCategoryName }) {
    // const [user, setUser] = useState([])

    const context = useContext(Context);

    const [searchTerm, setSearchTerm] = useState('')

    const handleChange = (e) => {
        console.log(e.target.value);
        setSearchTerm(e.target.value)
        getSearchTerm(e, e.target.value)
    }

    const navigate = useNavigate()

    const handleClickHome = (e) => {
        setSearchTerm('')
        getSearchTerm(e, '')
        getCategoryName('')
        navigate('/')
    }

    const handleClickSaved = (e) => {
        setSearchTerm('')
        getSearchTerm(e, '')
        getCategoryName('')
        navigate('/saved')
    }

    const handleClickButtons = (e) => {
        console.log('click', e)
        if (e.target.tagName === 'BUTTON') {
            getCategoryName(e.target.id)
        } else {
            getCategoryName(e.target.parentElement.id)
        }
    }

    return (
        <div className="header">
            <div className="headerNormal wrapper">
                <div className="logo">
                    <Link to='/' onClick={handleClickHome}><img src={logo} alt="DreamDates Logo" /></Link>
                </div>

                <form className="headerSearchBar" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="search" className="sr-only">Search for</label>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search for Food, Movies, Active..."
                        onChange={handleChange}
                        value={searchTerm}
                    />
                    <div className="magnifyingGlass">
                        <img src={magnifyingGlass} alt="magnifying glass" />
                    </div>
                </form>
                <div className='headerFilter'>
                    <div>
                        <button id="restaurants" onClick={handleClickButtons} className="pinkButton"><p>Food</p></button>
                    </div>
                    <div>
                        <button id="movies" onClick={handleClickButtons} className="pinkButton"><p>Movies</p></button>
                    </div>
                    <div>
                        <button id="active" onClick={handleClickButtons} className="pinkButton"><p>Active</p></button>
                    </div>
                    <div>
                        <button id="attractions" onClick={handleClickButtons} className="pinkButton"><p>Attractions</p></button>
                    </div>
                    <div>
                        <button id="events" onClick={handleClickButtons} className="pinkButton"><p>Live Entertainment</p></button>
                    </div>
                </div>
                <div className="headerRightSide">
                    <div className="savedButton">
                        <Link to='/saved' onClick={handleClickSaved} className={`pinkButton ${!user.token && 'disable-link'}`}>
                            <img src={redHeart} alt="red heart" />
                            <p>Saved</p>
                        </Link>
                    </div>
                    {/* <div className="userAuth"> */}
                    {user.token ?
                        <div className="userAuth">
                            <p className='welcome'>Welcome back, {user.name}!</p>
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
            {/* MOBILE */}
            <div className="headerMobile wrapper">
                <div className="logo">
                    <Link to='/' onClick={handleClickHome}><img src={logoMobile} alt="DreamDates Logo" /></Link>
                </div>

                <form className="headerSearchBar" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="search" className="sr-only">Search for</label>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search"
                        onChange={handleChange}
                        value={searchTerm}
                    />
                    <div className="magnifyingGlass">
                        <img src={magnifyingGlass} alt="magnifying glass" />
                    </div>
                </form>
                <div className='headerFilter'>
                    <div>
                        <button id="restaurants" onClick={handleClickButtons} className="pinkButton"><p>Food</p></button>
                    </div>
                    <div>
                        <button id="movies" onClick={handleClickButtons} className="pinkButton"><p>Movies</p></button>
                    </div>
                    <div>
                        <button id="active" onClick={handleClickButtons} className="pinkButton"><p>Active</p></button>
                    </div>
                    <div>
                        <button id="attractions" onClick={handleClickButtons} className="pinkButton"><p>Attractions</p></button>
                    </div>
                    <div>
                        <button id="events" onClick={handleClickButtons} className="pinkButton"><p>Live Entertainment</p></button>
                    </div>
                </div>
                <div className="headerRightSide">
                    <div className="savedButton">
                        <Link to='/saved' onClick={handleClickSaved} className={`pinkButton ${!user.token && 'disable-link'}`}>
                            <img src={redHeart} alt="red heart" />
                            {/* <p>Saved</p> */}
                        </Link>
                    </div>

                    {user.token ?
                        <div className="userAuth">
                            <div className="pinkButton">
                                <img src={profileIcon} alt="" />
                            <div className='profile'>
                                <div className="profileContainer">
                                    <p className='welcome'>Welcome back, {user.name}!</p>
                                    <br />
                                    <Link to='/' onClick={logUserOut} className="signOut">Sign out</Link>
                                </div>
                            </div>
                            </div>
                        </div>
                        :
                        <div className="userAuth">
                            <Link to={'/signin'} className="pinkButton">
                                <p>Sign In</p>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header
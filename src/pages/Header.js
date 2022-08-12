// Header.js
import logo from '../assets/dreamDatesLogo.png'
import redHeart from '../assets/redHeart.svg';
import magnifyingGlass from '../assets/magnifyingGlass.svg';


function Header() {
    return (
        <div className="header wrapper">
            <div className="logo">
                <img src={logo} alt="DreamDates Logo" />
            </div>
            
            <form className="headerSearchBar">
                    <div className="magnifyingGlass">
                        <img src={magnifyingGlass} alt="" />
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

            <div className="saved">
                <button className="pinkButton">
                    <img src={redHeart} alt="red heart" /> 
                    <p>Saved</p>
                </button>
            </div>
            
            <div className="userAuth">
                <button className="pinkButton">
                    <p>Sign In</p>
                </button>
            </div>
        </div>
    )
}

export default Header
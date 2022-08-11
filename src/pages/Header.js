// Header.js
import { GiMagnifyingGlass } from 'react-icons/gi';
import redHeart from '../assets/redHeart.svg';


function Header() {
    return (
        <div className="header">
            <div className="logo">
                DreamDates
            </div>
            
            <form className="headerSearchBar">
                    <div className="magnifyingGlass">
                        <GiMagnifyingGlass />
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

            <form className='headerFilter'>
                <input
                    type="radio"
                    name="headerSearchFilter"
                    id="food"
                    // onChange={}
                    // value={}
                />
                <label htmlFor="food" className="pinkButton">Food</label>
                <input
                    type="radio"
                    name="headerSearchFilter"
                    id="movies"
                    // onChange={}
                    // value={}
                />
                <label htmlFor="movies" className="pinkButton">Movies</label>
                <input
                    type="radio"
                    name="headerSearchFilter"
                    id="active"
                    // onChange={}
                    // value={}
                />
                <label htmlFor="active" className="pinkButton">Active</label>
                <input
                    type="radio"
                    name="headerSearchFilter"
                    id="attractions"
                    // onChange={}
                    // value={}
                />
                <label htmlFor="attractions" className="pinkButton">Attractions</label>
                <input
                    type="radio"
                    name="headerSearchFilter"
                    id="liveEntertainment"
                    // onChange={}
                    // value={}
                />
                <label htmlFor="liveEntertainment" className="pinkButton">Live Entertainment</label>
            </form>

            <div className="saved">
                <p className="pinkButton"> <img src={redHeart} alt="red heart" /> Saved</p>
            </div>
            
            <div className="userAuth">
                <p className="pinkButton">Sign In</p>
            </div>
        </div>
    )
}

export default Header
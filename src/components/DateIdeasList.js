// DateIdeasList.js
import { useState } from 'react';
import { useEffect } from 'react';
import whiteHeart from '../assets/whiteHeart.svg';
import redHeart from '../assets/redHeart.svg';
import x from '../assets/X.svg';
import defaultImagePlaceholderSmall from '../assets/defaultImagePlaceholderSmall.jpg';
import { Link, } from "react-router-dom"

function DateIdeasList({ ideas, selectedEvent, userId, searchTerm, categoryName }) {
    let mainList = []
    const [list, setList] = useState([])
    const [closeNotSignedIn, setCloseNotSignedIn] = useState(false)
    const [saved, setSaved] = useState([])
    console.log('dateDetails')

    useEffect(() => {
        // making the object into an array
        for (let category in ideas) {
            ideas[category].forEach(item => mainList.push(item))
        }

        // randomize the list
        mainList = mainList.sort(() => Math.random() - 0.5)
        setList(mainList)
    }, [ideas])

    useEffect(() => {
        const fetchSaved = async () => {
            const response = await fetch('https://dream-dates.herokuapp.com/dreamdates/saved/dates', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "user_id": userId
                })
            }).then(res => res.json())
                .then(data => {
                    const savedId = []
                    data.forEach(item => {
                        savedId.push(item.id)
                    })
                    setSaved(savedId)
                })
        }

        fetchSaved()
    }, [])

    const noZipCode = (addy) => {
        const reg = /(?<![0-9-])([0-9]{5}(?:[ -][0-9]{4})?)(?![0-9-])/gm
        const str = addy
        return str.replace(reg, '')
    }

    const handleClick = () => {
        if (!userId) {
            // sign up or sign in pop up
            setCloseNotSignedIn(!closeNotSignedIn)
        }
    }

    const handleClickNotSignInClose = (e) => {
        if (e.target.className === 'catch' || e.target.id === 'closeCatch') {
            setCloseNotSignedIn(!closeNotSignedIn)
        }
    }

    const dollarSigns = (num) => {
        const dollar = [];
        for (let i = 0; i < num; i++) {
            dollar.push('$')
        }
        return dollar.join('')
    }

    const filteredList = list.filter(item => (item.title.toLowerCase().match(searchTerm.toLowerCase()) && (item.categoryType.match(categoryName))))

    const checkIfSaved = (eventId) => {
        return saved.some(item => item == eventId)
    }

    return (
        <div className="dateIdeasList">

            {closeNotSignedIn && <div className="catch" onClick={handleClickNotSignInClose}>
                <div className="notSignedIn">
                    <div className="closeButton">
                        <button onClick={handleClickNotSignInClose}><img src={x} alt="x icon" id='closeCatch' /></button>
                    </div>
                    <div className="userAuth">
                        <Link to={'/signin'} className="pinkButton userAuthTop">
                            <p>Sign In</p>
                        </Link>
                        <Link to={'/signup'} className="pinkButton">
                            <p>Sign Up</p>
                        </Link>
                    </div>
                </div>
            </div>
            }

            <div className="dateIdeasContainer wrapper">
                {filteredList.map(idea => {
                    return (
                        <div className="dateIdeasCard" onClick={(e) => selectedEvent(e, idea)} key={idea.id}>
                            {/* <div onMouseOver={toggleHeart} className="heart whiteHeart">
                            </div> */}
                            <button className={`heart ${checkIfSaved(idea.id) && 'hideHeart'}`} onClick={handleClick}>
                                <img src={whiteHeart} className="whiteHeart" alt="White Heart" id='save' />
                            </button>
                            <button className={`heart ${!checkIfSaved(idea.id) && 'hideHeart'}`} onClick={handleClick}>
                                <img src={redHeart} className="redHeart" alt="White Heart" id='save' />
                            </button>
                            <div className="imageContainer">
                                <img src={idea.img ? idea.img : defaultImagePlaceholderSmall} alt={`Image of ${idea.title}`} />
                            </div>
                            <div className="textContainer">
                                <h2>{idea.title}</h2>
                                <p>{idea.price_range && dollarSigns(idea.price_range)} {idea.categoryType}</p>
                                <p>{idea.city && noZipCode(idea.city)}</p>
                            </div>
                        </div>
                    )
                })
                }
            </div>



        </div>
    )
}

export default DateIdeasList
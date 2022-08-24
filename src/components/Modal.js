// Modal.js
import globe from '../assets/globe.svg'
import { Link } from 'react-router-dom'
import whiteHeart from '../assets/whiteHeart.svg'
import x from '../assets/X.svg'
import clock from '../assets/clock.svg'
import about from '../assets/about.svg'
import phone from '../assets/phone.svg'
import location from '../assets/location.svg'
import image from '../assets/image.svg'
import Context from "../context/context";
import { useContext } from 'react'
import { useState } from 'react'
import yourNextDateDestination from '../assets/yourNextDateDestination.png'


function Modal({eventDetails, closeModal, userId}) {
    const { id, title, description, img, type, adress_street, city, venue, country, price_range, votes, rating } = eventDetails

    const [closeNotSignedIn, setCloseNotSignedIn] = useState(false)

    const handleClickModalClose = (e) => {
        if (e.target.className === 'modal' || e.target.id === 'close') {
            closeModal()
        }
    }

    const handleClickNotSignInClose = (e) => {
        if (e.target.className === 'catch' || e.target.id === 'closeCatch') {
            setCloseNotSignedIn(!closeNotSignedIn)
        }
    }

    const context = useContext(Context);
    
    const handleClickSave = () => {
        if (!userId) setCloseNotSignedIn(!closeNotSignedIn)
        console.log('Save');
        console.log(context.userid)
        console.log(description)


        // const fetchSaved = async () => {
        //     try {
        //         const response = await fetch('http://localhost:4000/dreamdates/saved/dates')
        //         if (!response.ok) throw Error("did not received expected data")
        //         const savedList = await response.json()

        //         console.log(savedList)

        //     } catch (err) {
        //         alert(err.message)
        //     }
        // }
        // fetchSaved()


        fetch ('http://localhost:4000/dreamdates/datingideas/saved', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "id": id,
                "title": title,
                "description": description,
                "img": img,
                "user_id": userId,
                "type": type,
                "adress_street": adress_street,
                "city": city,
                "venue": venue,
                "country": country,
                "price_range": price_range,
                "votes": votes,
                "rating": rating
            })
        }).then(res => res.json())
            .then(data => console.log(data))


        // fetch(`http://localhost:4000/dreamdates/datingideas/delete/${id}`, {
        //     method: 'DELETE',
        //     body: JSON.stringify({
        //         userid: userId
        //     })
        // }).then(res => res.json())
        // .then(data => console.log(data))
    }


    return (
        <div className="modal" onClick={handleClickModalClose}>

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

            <div className="modalContainer">
                <div className="buttonContainer">
                    <button onClick={handleClickSave}><img src={whiteHeart} alt="white heart icon" id='save'/></button>
                    <button onClick={handleClickModalClose}><img src={x} alt="x icon" id='close' /></button>
                </div>
                <div className="imageContainer">
                    <img src={img ? img : yourNextDateDestination} alt={`A photo of ${title}`} className={img && 'fullImage'}/>
                </div>
                <div className="titleContainer">
                    <h1>{title}</h1>
                </div>
                <div className="textContainer">
                    <div className="topSide">
                        <div className="heading">
                            <Link to='' className='pinkButton'>
                                <img src={globe} alt="globe icon" /> <p>Website</p>
                            </Link>
                            <h2>$$$</h2>
                            <h2>Restaurant</h2>
                        </div>
                    </div>
                    <div className="midSide">
                        <div className="leftSide">
                            <div className="subTitle">
                                <div className="midIcon">
                                    <img src={about} alt='information icon'/>
                                </div>
                                <h2>About</h2>
                            </div>
                            <p>{description}</p>
                            <div className="subTitle">
                                <div className="midIcon">
                                    <img src={phone} alt='phone icon'/>
                                </div>
                                <h2>Phone</h2>
                            </div>
                            <p>(123)-456-7890</p>
                            <div className="subTitle">
                                <div className="midIcon">
                                    <img src={location} alt='map pin icon' />
                                </div>
                                <h2>Location</h2>
                            </div>
                            <p>{adress_street}</p>
                            <p>{city}</p>
                        </div>
                        <div className="rightSide">
                            <div className="subTitle">
                                <div className="midIcon">
                                    <img src={clock} alt='clock icon'/>
                                </div>
                                <h2>Hours</h2>
                            </div>
                            <p>WE CLOSED</p>
                        </div>
                    </div>
                    <div className="botSide">
                            <div className="subTitle">
                                <div className="midIcon">
                                    <img src={image} alt='image icon'/>
                                </div>
                                <h2>Photos</h2>
                            </div>

                            <div className="carousel">
                                <div className="carouselContainer">
                                    <div className="carouselCard">
                                        <img src="" alt="" className='test'/>
                                    </div>
                                    <div className="carouselCard">
                                        <img src="" alt="" className='test'/>
                                    </div>
                                    <div className="carouselCard">
                                        <img src="" alt="" className='test'/>
                                    </div>
                                    <div className="carouselCard">
                                        <img src="" alt="" className='test'/>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
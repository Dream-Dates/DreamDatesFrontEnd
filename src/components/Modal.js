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


function Modal({eventDetails, closeModal}) {
    const { id, title, description, img, type, adress_street, city, venue, country, price_range, votes, rating } = eventDetails

    const handleClickClose = (e) => {
        if (e.target.className === 'modal' || e.target.id === 'close') {
            closeModal()
        }
    }

    const context = useContext(Context);
    
    const handleClickSave = () => {
        console.log('Save');
        console.log(context.userid)
        fetch ('http://localhost:4000/datingideas/saved', {
            method: 'POST',
            body: JSON.stringify({
                "id": id,
                "title": title,
                "description": description,
                "img": img,
                "user_id": context.userid,
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
    }

    const noZipCode = (addy) => {
        console.log('noZip')
        // regmatches(adress_street, gregexpr('(?<!\\d)\\d{5}(?:[ -]\\d{4})?\\b', text.var, perl=T))
        const reg = /(?<![0-9-])([0-9]{5}(?:[ -][0-9]{4})?)(?![0-9-])/gm
        const str = addy
        console.log(str.replace(reg, '-'))
        return str.replace(reg, '-')
    }

    return (
        <div className="modal" onClick={handleClickClose}>
            <div className="modalContainer">
                <div className="buttonContainer">
                    <button onClick={handleClickSave}><img src={whiteHeart} alt="white heart icon" id='save'/></button>
                    <button onClick={handleClickClose}><img src={x} alt="x icon" id='close' /></button>
                </div>
                <div className="imageContainer">
                    <img src={img} alt={`A photo of ${title}`}/>
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
    )
}

export default Modal
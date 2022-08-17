// Modal.js
import globe from '../assets/globe.svg'
import { Link } from 'react-router-dom'
import whiteHeart from '../assets/whiteHeart.svg'
import x from '../assets/X.svg'

function Modal({eventDetails, closeModal}) {
    const {title, description, img, adress_street, city} = eventDetails

    const handleClick = () => {
        closeModal()
    }
    return (
        <div className="modal">
            <div className="modalContainer">
                <div className="buttonContainer">
                    <button><img src={whiteHeart} alt="white heart icon" /></button>
                    <button onClick={handleClick}><img src={x} alt="x icon" /></button>
                </div>
                <div className="imageContainer">
                    <img src={img} alt={`A photo of ${title}`}/>
                </div>
                <div className="titleContainer">
                    <h2>{title}</h2>
                </div>
                <div className="textContainer">
                    <div className="topSide">
                        <div className="heading">
                            <h2>About</h2>
                            <Link to='' className='pinkButton'>
                                <img src={globe} alt="globe icon" /> <p>Website</p>
                            </Link>
                        </div>
                        <p>{description}</p>
                    </div>
                    <div className="bottomSide">
                        <div className="leftSide">
                            <h2>Phone</h2>
                            <p>(123)-456-7890</p>
                            <h2>Location</h2>
                            <p>{adress_street}</p>
                            <p>{city}</p>
                            <h2>Photos</h2>
                            <img src="" alt="" />
                        </div>
                        <div className="rightSide">
                            <h2>Hours</h2>
                            <p>WE CLOSED</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
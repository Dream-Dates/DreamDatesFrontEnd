// SavePopup.js
import redHeart from '../assets/redHeart.svg';
import whiteHeart from '../assets/whiteHeart.svg';

function SavePopup({ text }) {
    return (
        <div className="savePopup">
            <div className="savePopupContainer">
                <div className="imageContainer">
                    {text === 'Saved' ?
                        <img src={redHeart} alt="red heart" />
                        : <img src={whiteHeart} alt="white heart" />
                    }
                </div>
                <p>{text}!</p>
            </div>
        </div>
    )
}

export default SavePopup
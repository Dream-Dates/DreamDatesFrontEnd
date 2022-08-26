// SavePopup.js
import redHeart from '../assets/redHeart.svg';

function SavePopup() {
    return (
        <div className="savePopup">
            <div className="savePopupContainer">
                <img src={redHeart} alt="red heart" />
                <p>Saved</p>
            </div>
        </div>
    )
}

export default SavePopup()
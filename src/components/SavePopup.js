// SavePopup.js
import redHeart from '../assets/redHeart.svg';

function SavePopup() {
    return (
        <div className="savePopup">
            <div className="savePopupContainer">
                <div className="imageContainer">
                    <img src={redHeart} alt="red heart" />
                </div>
                <p>Saved!</p>
            </div>
        </div>
    )
}

export default SavePopup
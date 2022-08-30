// Carousel.js
import leftArrow from '../assets/leftArrow.svg'
import rightArrow from '../assets/rightArrow.svg'

function Carousel({ data }) {

    const slideLeft = () => {
        const slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 300;
    }

    const slideRight = () => {
        const slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 300;
    }

    return (
        <div className="carousel">
            <button className="carouselControls prev" onClick={slideLeft}> <img src={leftArrow} alt="previous" /> </button>
            <div className="carouselContainer" id="slider">
                {data.map(item => {
                    return (
                        <div className="carouselCard">
                            <img src={item} alt=".dd" />
                        </div>
                    )
                })}
            </div>
            <button className="carouselControls next" onClick={slideRight}> <img src={rightArrow} alt="next" /> </button>
        </div>
    )
}

export default Carousel
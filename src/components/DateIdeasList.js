// DateIdeasList.js
import whiteHeart from '../assets/whiteHeart.svg';

function DateIdeasList({ideas}) {
    let mainList = []

    // making the object into an array
    for(let category in ideas) {
        ideas[category].forEach(item => mainList.push(item))
    }

    // randomize the list
    mainList = mainList.sort(() => Math.random() - 0.5 )

    return(
        <div className="dateIdeasList wrapper">
            {mainList.map(idea => {
                return (
                    <div className="dateIdeasCard">
                        <div className="heart">
                            <img src={whiteHeart} alt="White Heart" />
                        </div>
                        <div className="imageContainer">
                            <img src={idea.img} alt={`Image of ${idea.title}`} />
                        </div>
                        <div className="textContainer">
                            <p>{idea.title}</p>
                            <p>$$$$$$$</p>
                            <p>{idea.city? idea.city : 'No Location'}</p>
                        </div>
                    </div>
                )
            })

            }

        </div>
    )
}

export default DateIdeasList
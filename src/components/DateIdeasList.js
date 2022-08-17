// DateIdeasList.js
import { useState } from 'react';
import { useEffect } from 'react';
import whiteHeart from '../assets/whiteHeart.svg';

function DateIdeasList({ideas, selectedEvent}) {
    let mainList = []
    const [list, setList] = useState([])

    
    useEffect(()=>{
        // making the object into an array
        for(let category in ideas) {
            ideas[category].forEach(item => mainList.push(item))
        }
        
        // randomize the list
        mainList = mainList.sort(() => Math.random() - 0.5 )
        setList(mainList)
    }, [ideas])

    return(
        <div className="dateIdeasList wrapper">
            {list.map(idea => {
                return (
                    <div className="dateIdeasCard" onClick={() => selectedEvent(idea)}>
                        <div className="heart">
                            <img src={whiteHeart} alt="White Heart" />
                        </div>
                        <div className="imageContainer">
                            <img src={idea.img} alt={`Image of ${idea.title}`} />
                        </div>
                        <div className="textContainer">
                            <h2>{idea.title}</h2>
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
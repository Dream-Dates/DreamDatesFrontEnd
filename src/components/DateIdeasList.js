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

    const toggleHeart = (e) => {
        console.log(e.target.className)
    }

    const noZipCode = (addy) => {
        console.log('noZip')
        const reg = /(?<![0-9-])([0-9]{5}(?:[ -][0-9]{4})?)(?![0-9-])/gm
        const str = addy
        return str.replace(reg, '')
    }

    return(
        <div className="dateIdeasList wrapper">
            {list.map(idea => {
                return (
                    <div className="dateIdeasCard" onClick={(e) => selectedEvent(e, idea)} key={idea.id}>
                        {/* <div onMouseOver={toggleHeart} className="heart whiteHeart">
                        </div> */}
                        <button className="heart">
                            <img src={whiteHeart} alt="White Heart" id='save'/>
                        </button>
                        <div className="imageContainer">
                            <img src={idea.img} alt={`Image of ${idea.title}`} />
                        </div>
                        <div className="textContainer">
                            <h2>{idea.title}</h2>
                            <p>$$$</p>
                            <p>{idea.city? noZipCode(idea.city) : 'No Location'}</p>
                        </div>
                    </div>
                )
            })

            }

        </div>
    )
}

export default DateIdeasList
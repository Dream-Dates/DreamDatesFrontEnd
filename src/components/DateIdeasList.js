// DateIdeasList.js
import { useState } from 'react';
import { useEffect } from 'react';
import whiteHeart from '../assets/whiteHeart.svg';
import x from '../assets/X.svg';
import events_backdrop from '../assets/events_backdrop.jpg';
import { Link,} from "react-router-dom"

function DateIdeasList({ideas, selectedEvent, userId}) {
    let mainList = []
    const [list, setList] = useState([])

    
    useEffect(()=>{
        // making the object into an array
        console.log(typeof(ideas))

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
        const reg = /(?<![0-9-])([0-9]{5}(?:[ -][0-9]{4})?)(?![0-9-])/gm
        const str = addy
        return str.replace(reg, '')
    }

    const handleClick = () => {
        if(userId) {
            //save method
        } else {
            // sign up or sign in pop up
        }
    }

    const handleClickClose = (e) => {
        console.log('click', e);
    }

    return(
        <div className="dateIdeasList">
            <div className="dateIdeasContainer wrapper">
                {list.map(idea => {
                    return (
                        <div className="dateIdeasCard" onClick={(e) => selectedEvent(e, idea)} key={idea.id}>
                            {/* <div onMouseOver={toggleHeart} className="heart whiteHeart">
                            </div> */}
                            <button className="heart">
                                <img src={whiteHeart} alt="White Heart" id='save'/>
                            </button>
                            <div className="imageContainer">
                                <img src={idea.img ? idea.img : events_backdrop} alt={`Image of ${idea.title}`} />
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

            <div className="catch">
                <div className="notSignedIn">
                    <div className="closeButton">
                        <button onClick={handleClickClose}><img src={x} alt="x icon" id='close' /></button>
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

        </div>
    )
}

export default DateIdeasList
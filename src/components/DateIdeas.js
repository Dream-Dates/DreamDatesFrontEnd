// DateIdeas.js
import { useEffect, useState } from "react"
import DateIdeasList from "./DateIdeasList"
import Modal from "./Modal"

function DateIdeas(){
    const [dateIdeas, setDateIdeas] = useState({
        events: [],
        movies: []
    })
    const [eventIdeas, setEventIdeas] = useState([])
    const [movieIdeas, setMovieIdeas] = useState([])
    const [chosenEvent, setChoseEvent] = useState([])
    const [showModal, setShowModal] = useState(false)

    const openModal = (event) => {
        setChoseEvent(event)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                //events
                const eventsResponse = await fetch("https://dream-dates.herokuapp.com/dreamdates/events")
                if (!eventsResponse.ok) throw Error("did not received expected data")
                const listEvents = await eventsResponse.json()
                console.log(listEvents)
                listEvents.forEach(item => item.categoryType = 'events')
                console.log(listEvents)
                
                //movies
                const moviesResponse = await fetch("https://dream-dates.herokuapp.com/dreamdates/movies")
                if (!moviesResponse.ok) throw Error("did not received expected data")
                const listMovies = await moviesResponse.json()
                listMovies.forEach(item => item.categoryType = 'movies')
                
                setDateIdeas({...dateIdeas, 'events': listEvents, 'movies': listMovies})
                setEventIdeas(listEvents)
                setMovieIdeas(listMovies)
            } catch (err) {
                alert(err.message)
            }
        }
        fetchEvents()
    }, [])

    return (
        <div className="dateIdeas">
            {showModal && <Modal eventDetails={chosenEvent} closeModal={closeModal}/>
            }
            <DateIdeasList ideas={dateIdeas} selectedEvent={openModal}/>
            
        </div>
    )
}

export default DateIdeas
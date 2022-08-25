// DateIdeas.js
import { useEffect, useState } from "react"
import DateIdeasList from "./DateIdeasList"
import Modal from "./Modal"

function DateIdeas({userId}){
    const [dateIdeas, setDateIdeas] = useState({
        events: [],
        movies: [],
        restaurants: []
    })
    const [chosenEvent, setChoseEvent] = useState([])
    const [showModal, setShowModal] = useState(false)

    const openModal = (e, eventDetails) => {
        setChoseEvent(eventDetails)
        // console.log(e.target.id)

        // if you click on the heart it will run save method if not it will open the modal
        if (e.target.id === 'save') {

        } else {
            setShowModal(true)
        }
    }

    const closeModal = () => {
        setShowModal(false)
    }

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                //events
                const eventsResponse = await fetch("https://dream-dates.herokuapp.com/dreamdates/events")
                // const eventsResponse = await fetch("http://localhost:4000/dreamdates/events")
                if (!eventsResponse.ok) throw Error("did not received expected data")
                const listEvents = await eventsResponse.json()
                // console.log(listEvents)
                listEvents.forEach(item => item.categoryType = 'events')
                console.log(listEvents)
                
                //movies
                const moviesResponse = await fetch("https://dream-dates.herokuapp.com/dreamdates/movies")
                // const moviesResponse = await fetch("http://localhost:4000/dreamdates/movies")
                if (!moviesResponse.ok) throw Error("did not received expected data")
                const listMovies = await moviesResponse.json()
                listMovies.forEach(item => item.categoryType = 'movies')
                
                // console.log(listMovies)
                setDateIdeas({...dateIdeas, 'events': listEvents, 'movies': listMovies})
                
                //restaurants
                // const restaurantsResponse = await fetch("https://dream-dates.herokuapp.com/dreamdates/restaurants")
                const restaurantsResponse = await fetch("http://localhost:4000/dreamdates/restaurants")
                if (!restaurantsResponse.ok) throw Error("did not received expected data")
                const listRestaurants = await restaurantsResponse.json()
                listRestaurants.forEach(item => item.categoryType = 'restaurants')
                
                console.log(listRestaurants)
                setDateIdeas({...dateIdeas, 'events': listEvents, 'movies': listMovies, 'restaurants': listRestaurants})

                //restaurants

            } catch (err) {
                alert(err.message)
            }
        }
        fetchEvents()
    }, [])

    return (
        <div className="dateIdeas">
            {showModal && <Modal eventDetails={chosenEvent} closeModal={closeModal} userId={userId}/>
            }
            <DateIdeasList ideas={dateIdeas} selectedEvent={openModal} userId={userId}/>
            
        </div>
    )
}

export default DateIdeas
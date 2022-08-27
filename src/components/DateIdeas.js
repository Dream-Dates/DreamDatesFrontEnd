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
    const [saved, setSaved] = useState([])
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

        const fetchSaved = async () => {
            console.log('fetchSaved in date ideas ', userId)
            const data = await fetch(`http://localhost:4000/dreamdates/saved/dates/${ userId }`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },

            // }).then(res => res.json())
            }).then( res => res.json() )
            // .then(data => {
            console.log('DATA in date ideas', data)
            const savedDates = data.map( date => {
                return {
                    ...date,
                    categoryType: "saved",
                    saved: true,
                }
            })
            
            setSaved(savedDates)
            console.log(saved)
            // })
        }

        
        fetchSaved()

        const fetchEvents = async () => {
            try {
                //events
                const eventsResponse = await fetch("https://dream-dates.herokuapp.com/dreamdates/events")
                // const eventsResponse = await fetch("http://localhost:4000/dreamdates/events")
                if (!eventsResponse.ok) throw Error("did not received expected data")
                const listEvents = await eventsResponse.json()
                console.log("EVENTS", listEvents)
                // listEvents.forEach(item => item.categoryType = 'events')
                const events = listEvents.map( date => {
                    return {
                        ...date,
                        categoryType: "event",
                        saved: saved.find( dateIdea => dateIdea.id === date.id ) !== -1,
                    }
                })
               // console.log(listEvents)
                
                //movies
                const moviesResponse = await fetch("https://dream-dates.herokuapp.com/dreamdates/movies")
                // const moviesResponse = await fetch("http://localhost:4000/dreamdates/movies")
                if (!moviesResponse.ok) throw Error("did not received expected data")
                const listMovies = await moviesResponse.json()
                // listMovies.forEach(item => item.categoryType = 'movies')
                const movies = listMovies.map( date => {
                    return {
                        ...date,
                        categoryType: "movie",
                        saved: saved.find( dateIdea => dateIdea.id === date.id ) !== -1,
                    }
                })
                // console.log(listMovies)
                
                //restaurants
                
                const restaurantsResponse = await fetch("https://dream-dates.herokuapp.com/dreamdates/restaurants")
                if (!restaurantsResponse.ok) throw Error("did not received expected data")
                const listRestaurants = await restaurantsResponse.json()
                // listRestaurants.forEach(item => item.categoryType = 'restaurants')
                const restaurants = listRestaurants.map( date => {
                    return {
                        ...date,
                        categoryType: "event",
                        saved: saved.find( dateIdea => dateIdea.id === date.id ) !== -1,
                    }
                })
                
               // console.log(listRestaurants)
                setDateIdeas({events, movies, restaurants})
                console.log( "TEST", {events, movies, restaurants} )

            } catch (err) {
                console.log(err.message)
            }
        }
        fetchEvents()
    }, [saved, userId])

    return (
        <div className="dateIdeas">
            {showModal && <Modal eventDetails={chosenEvent} closeModal={closeModal} userId={userId}/>
            }
            <DateIdeasList ideas={dateIdeas} selectedEvent={openModal} userId={userId}/>
            
        </div>
    )
}

export default DateIdeas
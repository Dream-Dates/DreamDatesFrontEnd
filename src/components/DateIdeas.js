// DateIdeas.js
import { useEffect, useState } from "react"
import DateIdeasList from "./DateIdeasList"
import Modal from "./Modal"
import SavePopup from "./SavePopup"

function DateIdeas({ userId, searchTerm, categoryName }) {
    const [dateIdeas, setDateIdeas] = useState({
        events: [],
        movies: [],
        restaurants: []
    })
    const [chosenEvent, setChoseEvent] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showSavePopup, setShowSavePopup] = useState(false)
    const [saveMessage, setSaveMessage] = useState('')

    const openModal = (e, eventDetails) => {
        setChoseEvent(eventDetails)
        // console.log(e.target.id)

        // if you click on the heart it will run save method if not it will open the modal
        if (e.target.id === 'save') {
            if (userId) {
                console.log('card Save');
                fetch('http://localhost:4000/dreamdates/saved/dates', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        "user_id": userId
                    })
                }).then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.some(item => item.id == eventDetails.id)) {
                            console.log('match - unsave')
                            // if id match then we remove
                            fetch(`http://localhost:4000/dreamdates/datingideas/delete/${eventDetails.id}`, {
                                method: 'DELETE',
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    "userid": userId
                                })
                            }).then(res => res.json())
                                .then(data => console.log(data))
                            setShowSavePopup(true)
                            setSaveMessage('Unsaved')
                            setTimeout(() => {
                                setShowSavePopup(false)
                            }, 500)
                        } else {
                            console.log('no match - save')
                            console.log(eventDetails)
                            // if id does not match then we save
                            fetch('http://localhost:4000/dreamdates/datingideas/saved', {
                                method: 'POST',
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    "id": eventDetails.id,
                                    "type": eventDetails.type,
                                    "title": eventDetails.title,
                                    "adress_street": eventDetails.adress_street,
                                    "city": eventDetails.city,
                                    "country": eventDetails.country,
                                    "venue": eventDetails.venue,
                                    "price_range": eventDetails.price_range,
                                    "link": eventDetails.link,
                                    "img": eventDetails.img,
                                    "time": eventDetails.time,
                                    "description": eventDetails.description,
                                    "votes": eventDetails.votes,
                                    "price": eventDetails.price,
                                    "opening_hours": eventDetails.opening_hours,
                                    "website": eventDetails.website,
                                    "rating": eventDetails.rating,
                                    "user_id": userId
                                })
                            }).then(res => res.json())
                                .then(data => console.log(data))

                            setShowSavePopup(true)
                            setSaveMessage('Saved')
                            setTimeout(() => {
                                setShowSavePopup(false)
                            }, 500)
                        }
                    })
            }

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
                // console.log(listEvents)

                //movies
                const moviesResponse = await fetch("https://dream-dates.herokuapp.com/dreamdates/movies")
                // const moviesResponse = await fetch("http://localhost:4000/dreamdates/movies")
                if (!moviesResponse.ok) throw Error("did not received expected data")
                const listMovies = await moviesResponse.json()
                listMovies.forEach(item => item.categoryType = 'movies')

                // console.log(listMovies)
                setDateIdeas({ ...dateIdeas, 'events': listEvents, 'movies': listMovies })

                //restaurants

                const restaurantsResponse = await fetch("https://dream-dates.herokuapp.com/dreamdates/restaurants")
                if (!restaurantsResponse.ok) throw Error("did not received expected data")
                const listRestaurants = await restaurantsResponse.json()
                listRestaurants.forEach(item => item.categoryType = 'restaurants')


                // console.log(listRestaurants)
                setDateIdeas({ ...dateIdeas, 'events': listEvents, 'movies': listMovies, 'restaurants': listRestaurants })

            } catch (err) {
                alert(err.message)
            }
        }
        fetchEvents()
    }, [])

    return (
        <div className="dateIdeas">
            {showModal && <Modal eventDetails={chosenEvent} closeModal={closeModal} userId={userId} />
            }
            <DateIdeasList ideas={dateIdeas} selectedEvent={openModal} userId={userId} searchTerm={searchTerm} categoryName={categoryName} />
            {showSavePopup && <SavePopup text={saveMessage} />}
        </div>
    )
}

export default DateIdeas
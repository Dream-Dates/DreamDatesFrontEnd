// DateIdeas.js
import { useEffect, useState } from "react"
import DateIdeasList from "./DateIdeasList"

function DateIdeas(){
    const [dateIdeas, setDateIdeas] = useState({
        events: [],
        movies: []
    })
    const [eventIdeas, setEventIdeas] = useState([])
    const [movieIdeas, setMovieIdeas] = useState([])

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                //events
                const eventsResponse = await fetch("http://localhost:4000/dreamdates/events")
                if (!eventsResponse.ok) throw Error("did not received expected data")
                const listEvents = await eventsResponse.json()
                console.log(listEvents)
                listEvents.forEach(item => item.categoryType = 'events')
                console.log(listEvents)
                
                //movies
                const moviesResponse = await fetch("http://localhost:4000/dreamdates/movies")
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
            <DateIdeasList ideas={dateIdeas} />
        </div>
    )
}

export default DateIdeas
import React, { useEffect, useState } from 'react'
import "./Home.css"
export default function Home() {
    const [events, setEvents] = useState([])
    const [fetchError, setFetchError] = useState([])

    useEffect(() => {
        const fetchEvents = async () => {
            try{
                const response = await fetch("http://localhost:4000/dreamdates/events")
                if(!response.ok) throw Error("did not received expected data")
                const listEvents = await response.json()
                console.log(listEvents)
                setEvents(listEvents)
                setFetchError(null)
            } catch (err){
                setFetchError(err.message)
            }
        }
        fetchEvents()
    }, [])


  return (
    <div className='container'>
    </div>
  )
}

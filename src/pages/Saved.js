// Saved.js

import { useState } from "react"
import { useEffect } from "react"
import DateIdeasList from "../components/DateIdeasList"
import Modal from "../components/Modal"


function Saved({ userId, searchTerm, categoryName }) {
    const [saved, setSaved] = useState({})
    console.log(userId)
    const [chosenEvent, setChoseEvent] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [toggle, setToggle] = useState(false)

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
                        if (data.some(item => item.id === eventDetails.id)) {
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
                                setToggle(!toggle)
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


    // useEffect(() => {
    //     const fetchSaved = async () => {
    //         console.log('fetchSaved', userId)
    //         const response = await fetch('http://localhost:4000/dreamdates/saved/dates', {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({
    //                 "user_id": userId
    //             })
    //         }).then(res => res.json())
    //             .then(data => {
    //                 console.log('DATA', data)
    //                 data.forEach(item => item.categoryType = 'saved')
                    
    //                 setSaved({'saved': data})
    //                 console.log(saved)
    //             })
    //     }

    //     fetchSaved()
    // }, [toggle])
    useEffect(() => {
        const fetchSaved = async () => {
            console.log('fetchSaved', userId)
            const data = await fetch(`http://localhost:4000/dreamdates/saved/dates/${ userId }`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },

            // }).then(res => res.json())
            }).then( res => res.json() )
            // .then(data => {
            console.log('DATA', data)
            const savedDates = data.map( date => {
                return {
                    ...date,
                    categoryType: "saved",
                    saved: true,
                }
            })
            
            setSaved({'saved': savedDates})
            console.log("THIS IS SAVED",saved.saved, userId)
            // })
        }

        fetchSaved()
    }, [toggle])


    return (
        <div className="saved">
            {showModal && <Modal eventDetails={chosenEvent} closeModal={closeModal} userId={userId} />
            }
            <h3>Saved</h3>
            <DateIdeasList ideas={saved} selectedEvent={openModal} userId={userId} searchTerm={searchTerm} categoryName={categoryName} />
        </div>
    )
}

export default Saved
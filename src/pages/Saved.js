// Saved.js

import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import DateIdeasList from "../components/DateIdeasList";
import Modal from "../components/Modal";
import Context from "../context/context";
import mixpanel from "mixpanel-browser";

function Saved({ userId, searchTerm, categoryName }) {
    const [saved, setSaved] = useState({});
    const [chosenEvent, setChoseEvent] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(true);

    const context = useContext(Context);
    context.setPageIs("saved");

    // track how many times saved page is visited
    useEffect(() => {
        mixpanel.init(`${process.env.REACT_APP_MIXPANEL_TOKEN}`, {
            debug: true,
        });
        mixpanel.track("Page View", {
            userID: userId,
            pageLocation: "savedPage",
        });
    }, []);

    const openModal = (e, eventDetails) => {
        setChoseEvent(eventDetails);

        // if you click on the heart it will run save method if not it will open the modal
        if (e.target.id === "save") {
            if (userId) {
                fetch(
                    "https://dream-dates.herokuapp.com/dreamdates/saved/dates",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            user_id: userId,
                        }),
                    }
                )
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.some((item) => item.id == eventDetails.id)) {
                            // if id match then we remove
                            fetch(
                                `https://dream-dates.herokuapp.com/dreamdates/datingideas/delete/${eventDetails.id}`,
                                {
                                    method: "DELETE",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        userid: userId,
                                    }),
                                }
                            )
                                .then((res) => res.json())
                                .then((data) => {
                                    setToggle(!toggle);
                                });
                        } else {
                            // if id does not match then we save
                            fetch(
                                "https://dream-dates.herokuapp.com/dreamdates/datingideas/saved",
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        id: eventDetails.id,
                                        type: eventDetails.type,
                                        title: eventDetails.title,
                                        adress_street:
                                            eventDetails.adress_street,
                                        city: eventDetails.city,
                                        country: eventDetails.country,
                                        venue: eventDetails.venue,
                                        price_range: eventDetails.price_range,
                                        link: eventDetails.link,
                                        img: eventDetails.img,
                                        time: eventDetails.time,
                                        description: eventDetails.description,
                                        votes: eventDetails.votes,
                                        price: eventDetails.price,
                                        opening_hours:
                                            eventDetails.opening_hours,
                                        website: eventDetails.website,
                                        rating: eventDetails.rating,
                                        user_id: userId,
                                    }),
                                }
                            )
                                .then((res) => res.json())
                                .then((data) => {
                                    setToggle(!toggle);
                                });
                        }
                    });
            }
        } else {
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const triggerToggle = () => {
        setToggle(!toggle);
    };

    useEffect(() => {
        const fetchSaved = async () => {
            const response = await fetch(
                "https://dream-dates.herokuapp.com/dreamdates/saved/dates",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        user_id: userId,
                    }),
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    data.forEach((item) => (item.categoryType = "saved"));
                    setSaved({ saved: data });
                    setLoading(false);
                });
        };

        fetchSaved();
    }, [toggle, loading]);

    return (
        <div className="saved">
            {showModal && (
                <Modal
                    eventDetails={chosenEvent}
                    closeModal={closeModal}
                    userId={userId}
                    triggerToggle={triggerToggle}
                />
            )}
            <h3>Saved</h3>
            <DateIdeasList
                ideas={saved}
                selectedEvent={openModal}
                userId={userId}
                searchTerm={searchTerm}
                categoryName={categoryName}
            />
        </div>
    );
}

export default Saved;

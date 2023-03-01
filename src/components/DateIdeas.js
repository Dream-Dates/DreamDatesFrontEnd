// DateIdeas.js
import { useContext } from "react";
import { useEffect, useState } from "react";
import Context from "../context/context";
import DateIdeasList from "./DateIdeasList";
import Modal from "./Modal";
import SavePopup from "./SavePopup";
import mixpanel from "mixpanel-browser";
import ModalMovie from "./ModalMovie";

function DateIdeas({
    userId,
    searchTerm,
    categoryName,
    localStorageFinished,
    viewAll,
}) {
    const [dateIdeas, setDateIdeas] = useState({});
    const [chosenEvent, setChoseEvent] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showSavePopup, setShowSavePopup] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");
    const [toggle, setToggle] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const context = useContext(Context);
    context.setPageIs("home");

    // track how many times homepage is visited
    useEffect(() => {
        if (localStorageFinished) {
            mixpanel.init(`${process.env.REACT_APP_MIXPANEL_TOKEN}`, {
                debug: true,
            });
            if (userId) {
                mixpanel.track("Page View", {
                    userID: userId,
                    pageLocation: "homepage",
                });
            } else {
                mixpanel.track("Page View", {
                    userID: "No User ID",
                    pageLocation: "homepage",
                });
            }
        }
    }, [userId]);

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
                        if (data.some((item) => item.id === eventDetails.id)) {
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
                            ).then((res) => res.json());
                            setShowSavePopup(true);
                            setSaveMessage("Unsaved");
                            setTimeout(() => {
                                setShowSavePopup(false);
                            }, 500);
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
                                        address_street:
                                            eventDetails.address_street,
                                        city: eventDetails.city,
                                        country: eventDetails.country,
                                        venue: eventDetails.venue,
                                        price_range: eventDetails.price_range,
                                        link: eventDetails.link,
                                        img: eventDetails.img,
                                        image: eventDetails.image,
                                        time: eventDetails.time,
                                        description: eventDetails.description,
                                        votes: eventDetails.votes,
                                        price: eventDetails.price,
                                        opening_hours:
                                            eventDetails.opening_hours,
                                        website: eventDetails.website,
                                        rating: eventDetails.rating,
                                        user_id: userId,
                                        reviews: eventDetails.reviews,
                                        trailer: eventDetails.trailer,
                                        datetime_utc: eventDetails.datetime_utc,
                                    }),
                                }
                            ).then((res) => res.json());
                            setShowSavePopup(true);
                            setSaveMessage("Saved");
                            setTimeout(() => {
                                setShowSavePopup(false);
                            }, 500);
                        }
                    });
            }
            // track every time a date is saved
            mixpanel.init(`${process.env.REACT_APP_MIXPANEL_TOKEN}`, {
                debug: true,
            });
            mixpanel.track("Save/Unsave", {
                userID: userId,
                dateID: eventDetails.id,
                dateTitle: eventDetails.title,
            });
            setToggle(!toggle);
        } else {
            setShowModal(true);

            // track when date detail modal is opened
            mixpanel.init(`${process.env.REACT_APP_MIXPANEL_TOKEN}`, {
                debug: true,
            });
            mixpanel.track("Date Idea Viewed", {
                userID: userId,
                dateID: eventDetails.id,
                dateTitle: eventDetails.title,
            });
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const triggerToggle = () => {
        setToggle(!toggle);
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                //events
                const eventsResponse = await fetch(
                    "https://dream-dates.herokuapp.com/dreamdates/events"
                );
                // const eventsResponse = await fetch("http://localhost:4000/dreamdates/events")
                if (!eventsResponse.ok)
                    throw Error("did not received expected data");
                const listEvents = await eventsResponse.json();
                listEvents.forEach((item) => (item.categoryType = "events"));

                //movies
                const moviesResponse = await fetch(
                    "https://dream-dates.herokuapp.com/dreamdates/movies"
                );
                // const moviesResponse = await fetch("http://localhost:4000/dreamdates/movies")
                if (!moviesResponse.ok)
                    throw Error("did not received expected data");
                const listMovies = await moviesResponse.json();
                listMovies.forEach((item) => (item.categoryType = "movies"));

                //restaurants
                const restaurantsResponse = await fetch(
                    "https://dream-dates.herokuapp.com/dreamdates/restaurants"
                );
                // const restaurantsResponse = await fetch("http://localhost:4000/dreamdates/restaurants")
                if (!restaurantsResponse.ok)
                    throw Error("did not received expected data");
                const listRestaurants = await restaurantsResponse.json();
                listRestaurants.forEach(
                    (item) => (item.categoryType = "restaurants")
                );

                //attractions
                const attractionsResponse = await fetch(
                    "https://dream-dates.herokuapp.com/dreamdates/attractions"
                );
                // const attractionsResponse = await fetch("http://localhost:4000/dreamdates/attractions")
                if (!attractionsResponse.ok)
                    throw Error("did not received expected data");
                const listAttractions = await attractionsResponse.json();
                listAttractions.forEach(
                    (item) => (item.categoryType = "attractions")
                );

                setDateIdeas({
                    ...dateIdeas,
                    events: listEvents,
                    movies: listMovies,
                    restaurants: listRestaurants,
                    attractions: listAttractions,
                });

                setIsLoading(false);
            } catch (err) {
                alert(err.message);
            }
        };
        fetchEvents();
    }, [toggle]);

    // // track how many times homepage is visited
    // useEffect(() => {
    //     mixpanel.init(`${process.env.REACT_APP_MIXPANEL_TOKEN}`, {
    //         debug: true,
    //     });
    //     mixpanel.track("Page View", {
    //         userID: userId,
    //         pageLocation: "homepage",
    //     });
    // }, []);

    return (
        !isLoading && (
            <div className="dateIdeas">
                {showModal && (
                    <ModalMovie
                        eventDetails={chosenEvent}
                        closeModal={closeModal}
                        userId={userId}
                        triggerToggle={triggerToggle}
                    />
                )}

                {/* food  */}
                {(!categoryName || categoryName == "restaurants") && (
                    <DateIdeasList
                        ideas={dateIdeas.restaurants}
                        selectedEvent={openModal}
                        userId={userId}
                        searchTerm={searchTerm}
                        categoryName={categoryName}
                        viewAll={viewAll}
                    />
                )}

                {/* movies */}
                {(!categoryName || categoryName == "movies") && (
                    <DateIdeasList
                        ideas={dateIdeas.movies}
                        selectedEvent={openModal}
                        userId={userId}
                        searchTerm={searchTerm}
                        categoryName={categoryName}
                        viewAll={viewAll}
                    />
                )}

                {/* attractions */}
                {(!categoryName || categoryName == "attractions") && (
                    <DateIdeasList
                        ideas={dateIdeas.attractions}
                        selectedEvent={openModal}
                        userId={userId}
                        searchTerm={searchTerm}
                        categoryName={categoryName}
                        viewAll={viewAll}
                    />
                )}
                {/* live entertainment */}
                {(!categoryName || categoryName == "events") && (
                    <DateIdeasList
                        ideas={dateIdeas.events}
                        selectedEvent={openModal}
                        userId={userId}
                        searchTerm={searchTerm}
                        categoryName={categoryName}
                        viewAll={viewAll}
                    />
                )}
                {showSavePopup && <SavePopup text={saveMessage} />}
            </div>
        )
    );
}

export default DateIdeas;

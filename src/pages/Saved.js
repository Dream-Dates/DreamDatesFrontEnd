// Saved.js

import { useState } from "react"
import { useEffect } from "react"
import DateIdeasList from "../components/DateIdeasList"

function Saved({userId}) {
    const [saved, setSaved] = useState({})

    useEffect(() => {
        // const fetchSaved = async () => {
        //     try {
        //         const response = await fetch('http://localhost:4000/dreamdates/saved/dates')
        //         if (!response.ok) throw Error("did not received expected data")
        //         const savedList = await response.json()
                
        //         console.log(savedList)
        //         savedList.forEach(item => item.categoryType = 'saved')
        //         console.log(typeof(savedList));
        //         setSaved({'saved': savedList})
        //         console.log(saved)
        //     } catch (err) {
        //         console.log(err.message)
        //     }
        // }
        // fetchSaved()
    // })
        const fetchSaved = async () => {
            console.log('fetchSaved', userId)
            const response = await fetch('http://localhost:4000/dreamdates/saved/dates', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "user_id": userId
                })
            }).then(res => res.json())
                .then(data => {
                    console.log('DATA', data)
                    data.forEach(item => item.categoryType = 'saved')
                    
                    setSaved({'saved': data})
                    console.log(saved)
                })
        }

        fetchSaved()

    }, [])

    return (
        <div className="saved">
            <h3>Saved</h3>
            <DateIdeasList ideas={saved} />
        </div>
    )
}

export default Saved
// Saved.js

import { useState } from "react"
import { useEffect } from "react"
import DateIdeasList from "../components/DateIdeasList"

function Saved() {
    const [saved, setSaved] = useState({})

    useEffect(() => {
        const fetchSaved = async () => {
            try {
                const response = await fetch('http://localhost:4000/dreamdates/saved/dates')
                if (!response.ok) throw Error("did not received expected data")
                const savedList = await response.json()
                
                console.log(savedList)
                savedList.forEach(item => item.categoryType = 'saved')
                console.log(typeof(savedList));
                setSaved({'saved': savedList})
                console.log(saved)
            } catch (err) {
                console.log(err.message)
            }
        }
        fetchSaved()
    }, [])

    return (
        <div className="saved">
            <h5>Saved</h5>
            <DateIdeasList ideas={saved} />
        </div>
    )
}

export default Saved
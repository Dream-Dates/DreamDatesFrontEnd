import {useState} from "react"
import Context from "./context"

export default function ContextProvider({children}){
    const [userid, setUserId] = useState('default');
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [lastname, setLastName] = useState("")

    const state = {
        userid: userid,
        setUserId: setUserId,
        name: name,
        setName: setName, 
        email: email,
        setEmail: setEmail,
        lastname: lastname,
        setLastName: setLastName
        
    }

    return (
    <Context.Provider value={state}>
        {children}
    </Context.Provider>
)
}
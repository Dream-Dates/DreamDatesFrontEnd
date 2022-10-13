import { useState } from "react";
import Context from "./context";

export default function ContextProvider({ children }) {
    const [initialDatesArray, setInitialDatesArray] = useState([]);
    const [initialDates, setInitialDates] = useState(true);
    const [initialSavedArray, setInitialSavedArray] = useState([]);
    const [initialSaved, setInitialSaved] = useState(true);

    const [pageIs, setPageIs] = useState("home");

    const state = {
        initialDatesArray: initialDatesArray,
        setInitialDatesArray: setInitialDatesArray,

        initialDates: initialDates,
        setInitialDates,
        setInitialDates,

        initialSavedArray: initialSavedArray,
        setInitialSavedArray: setInitialSavedArray,

        initialSaved: initialSaved,
        setInitialSaved,
        setInitialSaved,

        pageIs: pageIs,
        setPageIs: setPageIs,
    };

    return <Context.Provider value={state}>{children}</Context.Provider>;
}
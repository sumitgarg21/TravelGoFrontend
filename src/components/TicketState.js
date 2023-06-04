import TicketContext from "./TicketContext";
import { useState } from "react";

const TicketState = (props) => {
    const host = "http://localhost:5000"
    const [Ticket, setTicket] = useState([])
    const [Data, setData] = useState("")
    // Get all Ticket
    const myTicket = async () => {
        const response = await fetch(`${host}/ticket/travelhistory`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "authtoken": localStorage.getItem('token')
            }
        });
        const result = await response.json()
        if (result) {
            setTicket(result)
        } else {
            alert("Invalid inputs");
        }
    }
    const getTicket = async (From, To, Date, mode) => {
        setData(mode)
        const response = await fetch(`${host}/ticket/transport`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "authtoken": localStorage.getItem('token')
            },
            body: JSON.stringify({ From, To, Date, mode })
        });
        const result = await response.json()
        if (result) {
            setTicket(result)
        } else {
            alert("Invalid inputs");
        }
    }

    const getHotel = async (Zip) => {
        setData("Hotel")
        const response = await fetch(`${host}/ticket/hotel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "authtoken": localStorage.getItem('token')
            },
            body: JSON.stringify({ Zip })
        });
        const result = await response.json()
        if (result) {
            setTicket(result.result)
        } else {
            alert("Invalid inputs");
        }
    }
    return (
        <TicketContext.Provider value={{ Data, Ticket, getTicket, getHotel, myTicket }}>
            {props.children}
        </TicketContext.Provider>
    )

}
export default TicketState;
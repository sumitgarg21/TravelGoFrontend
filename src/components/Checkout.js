import React, { useState, useContext } from 'react'
import { TicketItems } from './TicketItems';
import TicketContext from './TicketContext';
import unavailable from './images/unavailable.jpg'
import { Spinner } from "./Spinner"
export const Checkout = (props) => {
    const context = useContext(TicketContext);
    const { Ticket, Data } = context
    const [spin, setSpin] = useState(true);
    const timeoutId = setTimeout(() => {
        setSpin(false);
    }, 3000);
    if (Ticket.length === 0) {
        if (spin) {
            return (<Spinner />)
        }
        else {
            return (
                <div>
                    <h1 className='d-flex justify-content-center'>No Data available right now</h1>
                    <div className='d-flex justify-content-center'>
                        <img src={unavailable} style={{ height: "1000px", width: "1000px" }} alt="unavailable" />
                    </div>
                </div>)
        }
    }
    else {
        console.log(Ticket)
        return (<div style={{ backgroundColor: "#f8fef8" }}>
            <h1 className='d-flex justify-content-center'>{Data}s Available</h1><br></br>
            {Ticket.slice(0, 20).map((Object) => {
                return <TicketItems key={Object.name} Object={Object} Data={Data} />
            })}
        </div>)
    }
}


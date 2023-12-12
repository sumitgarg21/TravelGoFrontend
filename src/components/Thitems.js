import { useContext, React } from 'react'
import { useNavigate } from "react-router-dom";
import TicketContext from "./TicketContext";
import { BASE_URL } from './BackendUrl';
export const Thitems = (props) => {
    const context = useContext(TicketContext)
    const { myTicket } = context
    const { Object } = props
    let navigate = useNavigate();
    let date = new Date(Object.Ondate);
    date = date.toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });

    const handleDelete = async (itemId) => {
        const response = await fetch(`${BASE_URL}/ticket/deleteticket/${itemId}`, {
            method: "DELETE",
        });
        const json = await response.json();
        console.log(json.message)
        if (json.success) {
            myTicket()
            navigate("/travelhistory");
        }
        else {
            alert(json.message);
        }
    };

    return (
        <div>
            <div className="container shadow p-1 mb-3 bg-body rounded card w-75">
                <div className="card-body">
                    <div className="card-text fs-5">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p><b>{date},{Object.mode}-{Object.name}</b></p>
                            <button className="btn btn-lg bi bi-trash3" onClick={() => handleDelete(Object._id)}></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

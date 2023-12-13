import React, { useState, useContext } from "react";
import hotel from "../images/hotel2.jpg";
import { useNavigate } from "react-router-dom";
import TicketContext from "../TicketContext";

export const HotelBlog = () => {
    const [Zip, setZip] = useState("");
    const navigate = useNavigate();
    const context = useContext(TicketContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { getHotel } = context;
        if (localStorage.getItem("token")) {
            getHotel(Zip);
            navigate("/checkout");
        } else {
            navigate("/login");
        }
    };

    const onChange = (e) => {
        setZip(e.target.value);
    };

    return (
        <div className="card text-bg-dark">
            <img
                src={hotel}
                style={{ height: "600px", width: "100%", objectFit: "cover" }}
                alt="hotel"
            />
            <div className="card-img-overlay">
                <h1 className="container card-title display-1" style={{ marginTop: "100px" }}>
                    Look around
                </h1>
                <br />
                <div className="container card-text fs-5" style={{ fontWeight: "normal" }}>
                    Chilling out on the bed in your hotel room watching television,
                    <br />
                    while wearing your own pajamas, is sometimes the best part of a vacation.
                    <br />
                    With TravelGo, you can choose hotels at your convenience.
                    <br />
                    <br />
                    <br />
                    <form onSubmit={handleSubmit}>
                        <div className="row justify-content-start">
                            <div className="col-lg-6 col-md-8">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1">
                                        <i className="fa-solid fa-map-pin"></i>
                                    </span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="Zip"
                                        onChange={onChange}
                                        placeholder="Enter ZIP Code"
                                        aria-label="ZIP Code"
                                        aria-describedby="basic-addon1"
                                        required
                                    />
                                    <button type="submit" className="btn btn-warning">
                                        Find Hotel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>

                    <br />
                </div>
            </div>
        </div>
    );
};

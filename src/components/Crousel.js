import React from "react";
import homebg from "./images/homebg.jpg";
import flight from "./images/flight.jpg";
import hotel from "./images/hotel.jpg";

export const Crousel = () => {
  const carouselItemStyle = {
    height: "500px", // Set a fixed height for all carousel items
  };

  const imageStyle = {
    height: "100%", // Ensure the image takes up the full height of the carousel item
    objectFit: "cover",
  };

  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active" style={carouselItemStyle}>
          <img src={homebg} className="d-block w-100" style={imageStyle} alt="first" />
          <div className="carousel-caption mb-4 d-md-block text-center">
            <h1 className="mb-3 display-4">Adventure is out there</h1>
            <p className="mb-3 fs-5">Get the best deals on your customized trip packages</p>
            <button type="button" className="btn btn-primary px-4 py-2 fs-6">
              Check now
            </button>
          </div>
        </div>
        <div className="carousel-item" style={carouselItemStyle}>
          <img src={flight} className="d-block w-100" style={imageStyle} alt="second" />
          <div className="carousel-caption mb-5 d-md-block text-center">
            <p className="mb-3 fs-5">Up to 70% discount on domestic and international flights</p>
            <button type="button" className="btn btn-primary px-4 py-2 fs-6">
              Check now
            </button>
          </div>
        </div>
        <div className="carousel-item" style={carouselItemStyle}>
          <img src={hotel} className="d-block w-100" style={imageStyle} alt="third" />
          <div className="carousel-caption mb-5 d-md-block text-center">
            <p className="mb-3 fs-5">Book hotel rooms at the lowest price</p>
            <button type="button" className="btn btn-primary px-4 py-2 fs-6">
              Book now
            </button>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

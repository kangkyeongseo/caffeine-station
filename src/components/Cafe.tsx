import React from "react";
import { Link } from "react-router-dom";
import { Place } from "routes/Home";

interface CafeProp {
  place: Place;
}

const Cafe = ({ place }: CafeProp) => {
  return (
    <Link to={`/cafe/${place.id}`} state={{ place }}>
      <span>{place.place_name}</span>
      <span>{place.road_address_name}</span>
      <span>{place.phone}</span>
    </Link>
  );
};

export default Cafe;

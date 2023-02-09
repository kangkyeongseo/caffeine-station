import React from "react";
import { Link } from "react-router-dom";
import { Place } from "./KakaoMap";

interface CafeProp {
  place: Place;
}

const Cafe = ({ place }: CafeProp) => {
  return (
    <li>
      <Link to={`/cafe/${place.id}`} state={{ place }}>
        <span>{place.place_name}</span>
        <span>{place.road_address_name}</span>
        <span>{place.phone}</span>
        <div>
          {place.distance.length > 3
            ? `${place.distance.slice(0, 1)}.${place.distance.slice(1, 3)}km`
            : `${place.distance}m`}
        </div>
      </Link>
    </li>
  );
};

export default Cafe;

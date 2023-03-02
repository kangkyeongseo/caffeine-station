import React from "react";
import { Link } from "react-router-dom";
import { Place } from "./KakaoMap";

interface CafeProp {
  place: Place;
}

const Cafe = ({ place }: CafeProp) => {
  return (
    <li>
      <Link
        to={`/cafe/${place.id}`}
        state={{
          id: place.id,
          x: place.x,
          y: place.y,
          place_name: place.place_name,
          place_url: place.place_url,
          distance: place.distance,
          road_address_name: place.road_address_name,
          address_name: place.address_name,
          phone: place.phone,
        }}
      >
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

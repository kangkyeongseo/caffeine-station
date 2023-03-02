import React from "react";
import { Link } from "react-router-dom";
import { Place } from "./KakaoMap";

interface CafeProp {
  id: string;
  x: string;
  y: string;
  place_name: string;
  place_url: string;
  distance: string;
  road_address_name: string;
  address_name: string;
  phone: string;
}

const Cafe = ({
  id,
  x,
  y,
  place_name,
  place_url,
  distance,
  road_address_name,
  address_name,
  phone,
}: CafeProp) => {
  return (
    <li>
      <Link
        to={`/cafe/${id}`}
        state={{
          id: id,
          x: x,
          y: y,
          place_name: place_name,
          place_url: place_url,
          distance: distance,
          road_address_name: road_address_name,
          address_name: address_name,
          phone: phone,
        }}
      >
        <span>{place_name}</span>
        <span>{road_address_name}</span>
        <span>{phone}</span>
        <div>
          {distance.length > 3
            ? `${distance.slice(0, 1)}.${distance.slice(1, 3)}km`
            : `${distance}m`}
        </div>
      </Link>
    </li>
  );
};

export default Cafe;

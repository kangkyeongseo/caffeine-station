import React from "react";
import { Link } from "react-router-dom";
import { Place } from "routes/Home";

const Cafe = ({ place_name, road_address_name, phone, id }: any) => {
  return (
    <Link to={`/cafe/${id}`}>
      <span>{place_name}</span>
      <span>{road_address_name}</span>
      <span>{phone}</span>
    </Link>
  );
};

export default Cafe;

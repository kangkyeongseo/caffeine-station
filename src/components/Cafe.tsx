import React from "react";
import { Place } from "routes/Home";

const Cafe = ({ place_name, road_address_name, phone }: any) => {
  return (
    <div>
      <span>{place_name}</span>
      <span>{road_address_name}</span>
      <span>{phone}</span>
    </div>
  );
};

export default Cafe;

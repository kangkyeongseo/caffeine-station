import { Place } from "components/KakaoMap";
import React from "react";
import { useLocation } from "react-router-dom";

interface DetailProp {
  state: {
    place: Place;
  };
}

const CafeDatail = () => {
  const { state }: DetailProp = useLocation();
  return <span>{state.place.place_name}</span>;
};

export default CafeDatail;

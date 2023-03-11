import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
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

const Container = styled.li`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
    div:last-child span {
      background-color: #144235;
    }
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const PlaceName = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.9);
`;

const AddressName = styled.span`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.7);
  margin-top: 5px;
`;

const PhoneNumber = styled.span`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.9);
  margin-top: 10px;
`;

const Distance = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #246653;
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

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
    <Container>
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
        <Column>
          <PlaceName>{place_name}</PlaceName>
          <AddressName>{road_address_name}</AddressName>
          <PhoneNumber>{phone}</PhoneNumber>
        </Column>
        <Column>
          <Distance>
            {distance.length > 3
              ? `${distance.slice(0, 1)}.${distance.slice(1, 3)}km`
              : `${distance}m`}
          </Distance>
        </Column>
      </Link>
    </Container>
  );
};

export default Cafe;

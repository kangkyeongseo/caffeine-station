import { ICafe } from "db/Cafe";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface Prop {
  cafe: ICafe;
}

const Container = styled.div`
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

const Cafe = ({ cafe }: Prop) => {
  return (
    <Container>
      <Link to={`/cafe/${cafe.id}`} state={cafe}>
        <Column>
          <PlaceName>{cafe.place_name}</PlaceName>
          <AddressName>{cafe.road_address_name}</AddressName>
          <PhoneNumber>{cafe.phone}</PhoneNumber>
        </Column>
        <Column>
          {cafe.distance ? (
            <Distance>
              {cafe.distance.length > 3
                ? `${cafe.distance.slice(0, 1)}.${cafe.distance.slice(1, 3)}km`
                : `${cafe.distance}m`}
            </Distance>
          ) : null}
        </Column>
      </Link>
    </Container>
  );
};

export default Cafe;

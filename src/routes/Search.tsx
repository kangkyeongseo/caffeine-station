import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { locationState } from "Atom";
import KakaoMap from "components/KakaoMap";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { coffeePrice } from "./Home";

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 20px 0px;
  margin-bottom: 30px;
  background-color: #ffffff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 10px;
  margin-bottom: 10px;
`;

const TextInput = styled.input`
  padding: 10px;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  position: absolute;
  top: 7px;
  right: 10px;
  color: #246653;
  font-size: 20px;
  background-color: inherit;
  border: none;
`;

const Lists = styled.ul`
  display: flex;
  gap: 20px;
  font-weight: lighter;
  margin-left: 20px;
`;

const List = styled.li<{ clicked: number }>`
  color: rgba(0, 0, 0, 0.9);
  font-weight: ${(props) => props.clicked};
  cursor: pointer;
`;

const PlaceBtn = styled.button`
  margin-left: 380px;
  font-size: 12px;
  border: none;
  background-color: #246653;
  border-radius: 20px;
  color: #ffffff;
  padding: 5px 10px;
  &:hover {
    background-color: #144235;
  }
`;

const Loading = styled.div`
  text-align: center;
  margin-top: 200px;
`;

const Search = () => {
  const location = useRecoilValue(locationState);
  const [loading, setLoading] = useState(true);
  const [searchingPlace, setSearchingPlace] = useState("");
  const [newPlace, setNewPlace] = useState("");
  const [arr, setArr] = useState(coffeePrice.low);
  const [getCenter, setGetCenter] = useState(false);
  const [price, setPrice] = useState("low");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setSearchingPlace(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewPlace(searchingPlace);
  };
  const onBtnClick = () => {
    setNewPlace(searchingPlace);
  };
  useEffect(() => {
    if (location.lat) setLoading(false);
  }, [location]);

  useEffect(() => {
    if (location.lat) {
      setLoading(false);
    }
  }, [arr]);

  useEffect(() => {
    if (getCenter) {
      setLoading(true);
      setGetCenter(false);
      setLoading(false);
    }
  }, [getCenter]);

  const onPriceClick = (price: string) => {
    setLoading(true);
    if (price === "low") {
      setArr(coffeePrice.low);
      setPrice("low");
    } else if (price === "middle") {
      setArr(coffeePrice.middle);
      setPrice("middle");
    } else {
      setArr(coffeePrice.high);
      setPrice("high");
    }
  };

  const onClick = () => {
    setGetCenter(true);
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <TextInput type="text" placeholder="주소" onChange={onChange} />
        <Button onClick={onBtnClick}>
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </Form>
      <PlaceBtn onClick={onClick}>이 지역 재검색</PlaceBtn>
      <Lists>
        <List
          onClick={() => onPriceClick("low")}
          clicked={price === "low" ? 500 : 300}
        >
          저가
        </List>
        <List
          onClick={() => onPriceClick("middle")}
          clicked={price === "middle" ? 500 : 300}
        >
          중가
        </List>
        <List
          onClick={() => onPriceClick("high")}
          clicked={price === "high" ? 500 : 300}
        >
          고가
        </List>
      </Lists>
      {!loading ? (
        <KakaoMap arr={arr} newPlace={newPlace} getCenter={getCenter} />
      ) : (
        <Loading>Loading</Loading>
      )}
    </Container>
  );
};

export default Search;

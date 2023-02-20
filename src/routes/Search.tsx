import { Location, locationState } from "Atom";
import KakaoMap from "components/KakaoMap";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { coffeePrice } from "./Home";

const Search = () => {
  const location = useRecoilValue(locationState);
  const [loading, setLoading] = useState(true);
  const [searchingPlace, setSearchingPlace] = useState("");
  const [newPlace, setNewPlace] = useState("");
  const [arr, setArr] = useState(coffeePrice.low);
  const [getCenter, setGetCenter] = useState(false);
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
    } else if (price === "middle") {
      setArr(coffeePrice.middle);
    } else {
      setArr(coffeePrice.high);
    }
  };

  const onClick = () => {
    setGetCenter(true);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="주소" onChange={onChange} />
        <input type="submit" value="검색" />
      </form>
      <ul>
        <li onClick={() => onPriceClick("low")}>저가</li>
        <li onClick={() => onPriceClick("middle")}>중가</li>
        <li onClick={() => onPriceClick("high")}>고가</li>
      </ul>
      <button onClick={onClick}>이 지역 재검색</button>
      {!loading ? (
        <KakaoMap arr={arr} newPlace={newPlace} getCenter={getCenter} />
      ) : (
        <span>Loading</span>
      )}
    </>
  );
};

export default Search;

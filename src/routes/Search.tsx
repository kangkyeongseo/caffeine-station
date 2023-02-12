import { Location } from "components/App";
import KakaoMap from "components/KakaoMap";
import React, { useEffect, useState } from "react";
import { coffeePrice } from "./Home";

interface Prop {
  location: Location;
}

const Search = ({ location }: Prop) => {
  const [loading, setLoading] = useState(true);
  const [searchingPlace, setSearchingPlace] = useState("");
  const [newPlace, setNewPlace] = useState("");
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
  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="주소" onChange={onChange} />
        <input type="submit" value="검색" />
      </form>
      {!loading ? (
        <KakaoMap
          location={location}
          arr={coffeePrice.low}
          isSearching={true}
          newPlace={newPlace}
        />
      ) : (
        <span>Loading</span>
      )}
      <button>이 지역 재검색</button>
    </>
  );
};

export default Search;

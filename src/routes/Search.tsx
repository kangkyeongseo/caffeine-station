import { Location } from "components/App";
import KakaoMap from "components/KakaoMap";
import { coffeePrice } from "./Home";

interface Prop {
  location: Location;
}

const Search = ({ location }: Prop) => {
  return (
    <>
      <form>
        <input type="text" placeholder="주소" />
        <input type="submit" value="검색" />
      </form>
      <KakaoMap location={location} arr={coffeePrice.low} />
      <button>이 지역 재검색</button>
    </>
  );
};

export default Search;

import { kakao } from "App";
import { searchLocationState } from "Atom";
import { Place } from "components/KakaoMap";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

interface Prop {
  arr: string[];
  latlng: any;
  placeSearching: boolean;
}

const useCafe = ({ arr, latlng, placeSearching }: Prop) => {
  const setSearchLocation = useSetRecoilState(searchLocationState);
  const [cafes, setCafes] = useState<Place[]>([]);
  const [cafeLoading, setCafeLoading] = useState(true);
  const ps = new kakao.maps.services.Places();

  const startSearch = async () => {
    arr.map((keyword) => {
      ps.keywordSearch(keyword, placesSearchCB, {
        location: latlng,
        sort: "distance",
      });
    });
  };

  const placesSearchCB = (data: Place[], status: number) => {
    if (status === kakao.maps.services.Status.OK && placeSearching) {
      setSearchLocation({
        lat: Number(data[0].y),
        lon: Number(data[0].x),
      });
    } else if (status === kakao.maps.services.Status.OK) {
      setCafes(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
      return;
    }
  };
  return { cafes, cafeLoading, startSearch };
};

export default useCafe;

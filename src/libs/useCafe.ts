import { kakao } from "App";
import { mapLocationState, searchLocationState } from "Atom";
import { Place } from "components/KakaoMap";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

interface Prop {
  arr: string[];
  latlng: any;
  newPlace: String | null;
  placeSearching: boolean;
}

const useCafe = ({ arr, latlng, newPlace, placeSearching }: Prop) => {
  const setSearchLocation = useSetRecoilState(searchLocationState);
  const setMapLocation = useSetRecoilState(mapLocationState);
  const [cafes, setCafes] = useState<Place[]>([]);
  const ps = new kakao.maps.services.Places();

  const startSearch = async () => {
    if (!placeSearching) {
      arr.map((keyword) => {
        ps.keywordSearch(keyword, placesSearchCB, {
          location: latlng,
          sort: "distance",
        });
      });
    } else {
      ps.keywordSearch(newPlace, placesSearchCB);
    }
  };

  const placesSearchCB = (data: Place[], status: number) => {
    if (status === kakao.maps.services.Status.OK && placeSearching) {
      setMapLocation({
        lat: Number(data[0].y),
        lon: Number(data[0].x),
      });
      setSearchLocation({
        lat: Number(data[0].y),
        lon: Number(data[0].x),
      });
      setCafes([data[0]]);
    } else if (status === kakao.maps.services.Status.OK) {
      setCafes((pre) => [...pre, ...data]);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
      return;
    }
  };
  return { cafes, startSearch };
};

export default useCafe;

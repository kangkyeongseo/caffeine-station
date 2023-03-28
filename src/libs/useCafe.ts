import { kakao } from "App";
import { mapLocationState, searchLocationState } from "Atom";
import { ICafe } from "db/Cafe";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

interface Prop {
  arr: string[];
  latlng: any;
}

const useCafe = ({ arr, latlng }: Prop) => {
  const setSearchLocation = useSetRecoilState(searchLocationState);
  const setMapLocation = useSetRecoilState(mapLocationState);
  const [cafes, setCafes] = useState<ICafe[]>([]);
  const ps = new kakao.maps.services.Places();

  const startSearch = (placeSearching: boolean, newPlace?: string) => {
    if (!placeSearching) {
      setCafes([]);
      arr.map((keyword) => {
        ps.keywordSearch(keyword, placesSearchCB, {
          location: latlng,
          sort: "distance",
        });
      });
    } else {
      ps.keywordSearch(newPlace, newPlaceSearchCB);
    }
  };

  const newPlaceSearchCB = (data: ICafe[], status: number) => {
    if (status === kakao.maps.services.Status.OK) {
      setMapLocation({
        lat: Number(data[0].y),
        lon: Number(data[0].x),
      });
      setSearchLocation({
        lat: Number(data[0].y),
        lon: Number(data[0].x),
      });
      setCafes([data[0]]);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
      return;
    }
  };

  const placesSearchCB = (data: ICafe[], status: number) => {
    if (status === kakao.maps.services.Status.OK) {
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

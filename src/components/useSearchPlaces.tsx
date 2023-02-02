import { useEffect } from "react";
import { useState } from "react";
import { Location, Place } from "routes/Home";

const { kakao }: any = window;

const useSearchPlaces = (location: any, caffeinePrice: string) => {
  const [newData, setNewData] = useState<Place[]>([]);
  const ps = new kakao.maps.services.Places();
  const latlng = new kakao.maps.LatLng(
    location && location.lat,
    location && location.lon
  );

  useEffect(() => {
    if (location) {
      searchCaffeine(caffeinePrice);
    }
  }, [location]);

  const searchCaffeine = (caffeinePrice: string) => {
    ps.keywordSearch(
      caffeinePrice === "low"
        ? "메가커피"
        : caffeinePrice === "middle"
        ? "이디야"
        : caffeinePrice === "high"
        ? "스타벅스"
        : null,
      placesSearchCB,
      {
        location: latlng,
        sort: "distance",
      }
    );
  };

  const placesSearchCB = (data: Place[], status: any, pagination: any) => {
    if (status === kakao.maps.services.Status.OK) {
      setNewData(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
      return;
    }
  };

  const reset = (newCaffeinePrice: string) => {
    searchCaffeine(newCaffeinePrice);
  };

  return { newData, reset };
};

export default useSearchPlaces;
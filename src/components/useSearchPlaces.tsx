import { useEffect } from "react";
import { useState } from "react";
import { Place } from "routes/Home";

const { kakao }: any = window;

const useSearchPlaces = (location: any) => {
  const [newData, setNewData] = useState<Place[]>([]);
  const ps = new kakao.maps.services.Places();
  const latlng = new kakao.maps.LatLng(
    location && location.lat,
    location && location.lon
  );

  useEffect(() => {
    if (location) {
      searchCaffeine();
    }
  }, [location]);

  const searchCaffeine = () => {
    ps.keywordSearch("메가커피", placesSearchCB, {
      location: latlng,
      sort: "distance",
    });
  };

  const placesSearchCB = (data: any, status: any, pagination: any) => {
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

  return newData;
};

export default useSearchPlaces;

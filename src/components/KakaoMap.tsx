import { useEffect, useState } from "react";
import { Location } from "routes/Home";
import { kakao } from "./App";

interface prop {
  location: Location;
  arr: string[];
}

export interface Place {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

const KakaoMap = ({ location, arr }: prop) => {
  // 마커를 담을 배열입니다
  const [loading, setLoading] = useState(true);
  const [combineData, setCombineDate] = useState<Place[]>([]);
  const [map, setMap] = useState<any>();
  const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
  const latlng = new kakao.maps.LatLng(location.lat, location.lon);

  useEffect(() => {
    const mapContainer = document.getElementById("kakao-map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(location.lat, location.lon), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

    // 지도를 생성합니다
    setMap(new kakao.maps.Map(mapContainer, mapOption));

    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places();

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다

    const placesSearchCB = (data: Place[], status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        data.forEach((cafe) => {
          if (parseInt(cafe.distance) < 1000) {
            setCombineDate((pre) => [...pre, cafe]);
          }
        });
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
        return;
      }
    };

    const startSearch = async () => {
      await Promise.all(
        arr.map((keyword) => {
          ps.keywordSearch(keyword, placesSearchCB, {
            location: latlng,
            sort: "distance",
          });
        })
      );
      setLoading(false);
    };

    startSearch();
  }, []);

  useEffect(() => {
    if (!loading && map) {
      console.log(combineData);
      const displayMarkers = () => {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        for (var i = 0; i < combineData.length; i++) {
          displayMarker(combineData[i]);
          bounds.extend(
            new kakao.maps.LatLng(combineData[i].y, combineData[i].x)
          );
        }
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      };
      const displayMarker = (place: Place) => {
        // 마커를 생성하고 지도에 표시합니다
        var marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x),
        });

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, "click", function () {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
          infowindow.setContent(
            '<div style="padding:5px;font-size:12px;">' +
              place.place_name +
              "</div>"
          );
          infowindow.open(map, marker);
        });
      };
      displayMarkers();
    }
  }, [combineData]);

  return (
    <>
      <div id="kakao-map" style={{ width: 400, height: 400 }}></div>
    </>
  );
};

export default KakaoMap;

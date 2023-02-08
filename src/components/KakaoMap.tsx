import { useEffect, useState } from "react";
import { Location } from "routes/Home";
import { kakao } from "./App";

interface prop {
  location: Location;
}

const KakaoMap = ({ location }: prop) => {
  // 마커를 담을 배열입니다
  let markers: any = [];

  useEffect(() => {
    const mapContainer = document.getElementById("kakao-map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(location.lat, location.lon), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

    // 지도를 생성합니다
    const map = new kakao.maps.Map(mapContainer, mapOption);

    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    const latlng = new kakao.maps.LatLng(location.lat, location.lon);
    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places();

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    const placesSearchCB = (data: any, status: any) => {
      console.log(data);
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        for (var i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    };

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place: any) {
      // 마커를 생성하고 지도에 표시합니다
      const marker = new kakao.maps.Marker({
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
    }
    ps.keywordSearch("메가커피", placesSearchCB, {
      location: latlng,
      sort: "distance",
    });
  }, []);

  return (
    <>
      <div id="kakao-map" style={{ width: 400, height: 400 }}></div>
    </>
  );
};

export default KakaoMap;

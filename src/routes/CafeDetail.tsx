import {
  faInfo,
  faMapMarked,
  faPhone,
  faRoad,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Place } from "components/KakaoMap";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { kakao } from "../App";

interface DetailProp {
  state: {
    place: Place;
  };
}

const CafeDatail = () => {
  const { state }: DetailProp = useLocation();
  const [map, setMap] = useState(null);
  useEffect(() => {
    const mapContainer = document.getElementById("kakao-detail-map"); // 지도를 표시할 div
    const mapOption = {
      center: new kakao.maps.LatLng(state.place.y, state.place.x), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };
    // 지도를 생성합니다
    setMap(new kakao.maps.Map(mapContainer, mapOption));
  }, []);
  useEffect(() => {
    if (map) {
      const imageSrc = `${process.env.PUBLIC_URL}/marker.png`; // 마커이미지의 주소입니다
      const imageSize = new kakao.maps.Size(30, 42); // 마커이미지의 크기입니다
      const imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
      // 마커가 표시될 위치입니다
      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );
      const markerPosition = new kakao.maps.LatLng(
        state.place.y,
        state.place.x
      );
      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });
      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);
    }
  }, [map]);
  return (
    <>
      <div>
        <h3>{state.place.place_name}</h3>
        <div>
          <div>
            <FontAwesomeIcon icon={faInfo} />
            <a href={state.place.place_url}>상세정보</a>
          </div>
          <div>
            <FontAwesomeIcon icon={faRoad} />
            <span>
              {state.place.distance.length > 3
                ? `${state.place.distance.slice(
                    0,
                    1
                  )}.${state.place.distance.slice(1, 3)}km`
                : `${state.place.distance}m`}
            </span>
          </div>
        </div>
        <ul>
          <li>
            <FontAwesomeIcon icon={faMapMarked} />
            <span>{state.place.road_address_name}</span>
            <span>{state.place.address_name}</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faPhone} />
            <span>{state.place.phone ? state.place.phone : "-"}</span>
          </li>
        </ul>
        <div id="kakao-detail-map" style={{ width: 400, height: 400 }}></div>
      </div>
    </>
  );
};

export default CafeDatail;

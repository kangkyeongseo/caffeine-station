import { useEffect, useState } from "react";
import { Location, mapLocationState, searchLocationState } from "Atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ICafe } from "db/Cafe";
import { kakao } from "../App";
import styled from "styled-components";
import useCafe from "libs/useCafe";
import Cafe from "./Cafe";

interface prop {
  arr: string[];
  location: Location;
  distance: number;
  newPlace?: string;
  getCenter?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Map = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
`;

const Lists = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  margin-top: 15px;
`;

const NoCafe = styled.span`
  display: block;
  margin: 50px 0px;
`;

const KakaoMap = ({
  arr,
  location,
  distance,
  newPlace,
  getCenter = false,
}: prop) => {
  const [loading, setLoading] = useState(true);
  const [combineData, setCombineDate] = useState<ICafe[]>([]);
  const [placeSearching, setPlaceSearching] = useState(false);
  const [map, setMap] = useState<any>(null);
  const [latlng, setLatlng] = useState(null);
  const [mapLocation, setMapLocation] = useRecoilState(mapLocationState);
  const setSearchLocation = useSetRecoilState(searchLocationState);
  const { cafes, startSearch } = useCafe({ arr, latlng });

  // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
  const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

  const setUserMaker = () => {
    //사용자 위치 마커
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
      mapLocation.lat,
      mapLocation.lon
    );
    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });
    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
  };
  const displayMarkers = () => {
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    // LatLngBounds 객체에 좌표를 추가합니다
    const bounds = new kakao.maps.LatLngBounds();
    for (var i = 0; i < combineData.length; i++) {
      displayMarker(combineData[i]);
      bounds.extend(new kakao.maps.LatLng(combineData[i].y, combineData[i].x));
    }
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
  };
  const displayMarker = (place: ICafe) => {
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
  };

  useEffect(() => {
    setMapLocation({ lat: location.lat, lon: location.lon });
  }, [location]);

  //카카오지도를 생성합니다
  useEffect(() => {
    const mapContainer = document.getElementById("kakao-map"); // 지도를 표시할 div
    const mapOption = {
      center: new kakao.maps.LatLng(mapLocation.lat, mapLocation.lon), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };
    // 지도를 생성합니다
    setMap(new kakao.maps.Map(mapContainer, mapOption));
    setLatlng(new kakao.maps.LatLng(mapLocation.lat, mapLocation.lon));
  }, [mapLocation, distance]);

  //지도가 존재할시 카페를 찾습니다 또한 지정된 위치에 마커를 표시합니다
  useEffect(() => {
    if (!map) return;
    setUserMaker();
    if (!placeSearching) {
      startSearch(placeSearching);
    }
  }, [map]);

  //Search 페이지에서 새로운 장소를 받을시 실행합니다.
  useEffect(() => {
    if (placeSearching) {
      startSearch(placeSearching, newPlace);
      setPlaceSearching(false);
    }
  }, [placeSearching]);

  //useCafe로 부터 카페들의 정보를 받습니다.
  useEffect(() => {
    if (!map) return;
    setCombineDate([]);
    cafes.forEach((cafe) => {
      if (parseInt(cafe.distance!) < distance) {
        setCombineDate((pre) => [...pre, cafe]);
      }
    });
  }, [cafes]);

  //카페의 마커를 표시합니다
  useEffect(() => {
    if (combineData.length > 0) {
      displayMarkers();
      setLoading(false);
    }
  }, [combineData]);

  //Search 페이지에서 새로운 장소를 받을시 실행합니다.
  useEffect(() => {
    if (newPlace && newPlace.length > 0) setPlaceSearching(true);
  }, [newPlace]);

  //새로운 중앙값을 구해 위치를 지정합니다.
  useEffect(() => {
    if (getCenter) {
      const center = map.getCenter();
      setSearchLocation({
        lat: Number(center.Ma),
        lon: Number(center.La),
      });
    }
  }, [getCenter]);

  return (
    <Container>
      <Map id="kakao-map"></Map>
      <Lists>
        {!loading && combineData.length > 1 ? (
          combineData
            .sort((a, b) => parseInt(a.distance!) - parseInt(b.distance!))
            .map((cafe) => <Cafe key={cafe.id} cafe={cafe} />)
        ) : (
          <NoCafe>근처에 선택한 카페가 존재하지 않습니다.</NoCafe>
        )}
      </Lists>
    </Container>
  );
};

export default KakaoMap;

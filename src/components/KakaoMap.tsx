import { Location, locationState, searchLocationState } from "Atom";
import useCafe from "libs/useCafe";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { kakao } from "../App";
import Cafe from "./Cafe";

interface prop {
  arr: string[];
  location: Location;
  newPlace?: string | null;
  getCenter?: boolean;
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
const Container = styled.div`
  margin-top: 20px;
`;

const Map = styled.div`
  width: 460px;
  height: 460px;
  margin: 0 auto;
`;

const Lists = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 460px;
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
  newPlace = null,
  getCenter = false,
}: prop) => {
  const [mapLocation, setMapLocation] = useState(location);
  const [loading, setLoading] = useState(true);
  const [combineData, setCombineDate] = useState<Place[]>([]);
  const [placeSearching, setPlaceSearching] = useState(false);
  const [map, setMap] = useState<any>(null);
  const [latlng, setLatlng] = useState(null);
  const [searchLocation, setSearchLocation] =
    useRecoilState(searchLocationState);
  const { cafes, startSearch } = useCafe({ arr, latlng, placeSearching });
  console.log(cafes);
  // 장소 검색 객체를 생성합니다
  const ps = new kakao.maps.services.Places();
  // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
  const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
  /* // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
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
    } else if (status === kakao.maps.services.Status.OK) {
      data.forEach((cafe) => {
        if (parseInt(cafe.distance) < 1200) {
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
  //카패를 찾습니다
  const startSearch = async () => {
    arr.map((keyword) => {
      ps.keywordSearch(keyword, placesSearchCB, {
        location: latlng,
        sort: "distance",
      });
    });
    setLoading(false);
  }; */
  //카카오지도를 생성합니다
  useEffect(() => {
    cafes.forEach((cafe) => {
      if (parseInt(cafe.distance) < 1200) {
        setCombineDate((pre) => [...pre, cafe]);
      }
    });
    setLoading(false);
  }, [cafes]);

  useEffect(() => {
    const mapContainer = document.getElementById("kakao-map"); // 지도를 표시할 div
    const mapOption = {
      center: new kakao.maps.LatLng(mapLocation.lat, mapLocation.lon), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };
    // 지도를 생성합니다
    setMap(new kakao.maps.Map(mapContainer, mapOption));
    setLatlng(new kakao.maps.LatLng(mapLocation.lat, mapLocation.lon));
  }, [mapLocation]);
  //지도가 존재할시 카페를 찾습니다 또한 지정된 위치에 마커를 표시합니다
  useEffect(() => {
    if (!map) return;
    if (map && !placeSearching) startSearch();
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
  }, [map]);
  //Search 페이지에서 새로운 장소를 받을시 실행합니다.
  useEffect(() => {
    if (placeSearching) {
      setCombineDate([]);
      /* ps.keywordSearch(newPlace, placesSearchCB); */
      setPlaceSearching(false);
    }
  }, [placeSearching]);
  //Search 페이지에서 새로운 장소를 받을시 실행합니다.
  useEffect(() => {
    if (newPlace && newPlace.length > 0) setPlaceSearching(true);
  }, [newPlace]);
  //카페의 마커를 표시합니다
  useEffect(() => {
    if (!loading) {
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
      displayMarkers();
    }
  }, [combineData]);
  //새로운 중앙값을 구해 위치를 지정합니다.
  useEffect(() => {
    if (getCenter) {
      setCombineDate([]);
      const center = map.getCenter();
      setMapLocation({
        lat: Number(center.Ma),
        lon: Number(center.La),
      });
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
            .sort((a, b) => parseInt(a.distance) - parseInt(b.distance))
            .map((cafe) => (
              <Cafe
                key={cafe.id}
                id={cafe.id}
                x={cafe.x}
                y={cafe.y}
                place_name={cafe.place_name}
                place_url={cafe.place_url}
                distance={cafe.distance}
                road_address_name={cafe.road_address_name}
                address_name={cafe.address_name}
                phone={cafe.phone}
              />
            ))
        ) : (
          <NoCafe>근처에 선택한 카페가 존재하지 않습니다.</NoCafe>
        )}
      </Lists>
    </Container>
  );
};

export default KakaoMap;

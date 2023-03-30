import {
  faInfo,
  faMapMarked,
  faPhone,
  faRoad,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { flashState, sessionState } from "Atom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { kakao } from "../App";

interface DetailProp {
  state: {
    id: string;
    x: string;
    y: string;
    place_name: string;
    place_url: string;
    distance?: string;
    road_address_name: string;
    address_name: string;
    phone: string;
  };
}

const Container = styled.div`
  max-width: 480px;
  min-height: calc(100vh - 110px);
  margin: 0 auto;
  padding: 20px 10px;
  background-color: #ffffff;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 30px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: bold;
  letter-spacing: 1px;
`;

const HeaderInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 70%;
  margin-top: 30px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Anckor = styled.a`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Text = styled.span`
  font-size: 12px;
`;

const InfoContainer = styled.div`
  margin-bottom: 20px;
  padding: 0 30px;
`;

const SubTitle = styled.h3`
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const Info = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 20px;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoText = styled.span`
  font-size: 15px;
  margin-bottom: 3px;
`;

const Map = styled.div`
  width: 95%;
  aspect-ratio: 1/1;
  margin: 0 auto;
`;

const CafeDatail = () => {
  const { state }: DetailProp = useLocation();
  const [map, setMap] = useState(null);
  const [heart, setHeart] = useState(false);
  const setFlash = useSetRecoilState(flashState);
  const [session, setSession] = useRecoilState(sessionState);
  const getHeart = async () => {
    const response = await fetch(
      `http://localhost:8000/api/heart/${state.id}`,
      {
        credentials: "include",
      }
    ).then((response) => response.json());
    setHeart(response.ok);
  };
  useEffect(() => {
    getHeart();
  }, []);
  useEffect(() => {
    const mapContainer = document.getElementById("kakao-detail-map"); // 지도를 표시할 div
    const mapOption = {
      center: new kakao.maps.LatLng(state.y, state.x), // 지도의 중심좌표
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
      const markerPosition = new kakao.maps.LatLng(state.y, state.x);
      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });
      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);
    }
  }, [map]);
  useEffect(() => {
    if (session.loggedIn) {
    }
    return;
  }, []);
  const onHeartClick = async () => {
    if (session.loggedIn) {
      const data = { ...session.user, ...state };
      await fetch("http://localhost:8000/api/heart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      })
        .then((response) => response.json())
        .then((json) => {
          setSession({ loggedIn: true, user: json.user });
          setFlash(json.message);
        });
      setHeart((pre) => !pre);
    } else {
      console.log("login pls");
    }
  };
  return (
    <Container>
      <Header>
        <Title>{state.place_name}</Title>
        <HeaderInfo>
          <Column>
            <Anckor href={state.place_url}>
              <FontAwesomeIcon icon={faInfo} color={"#144235"} />
              <Text>상세정보</Text>
            </Anckor>
          </Column>
          <Column>
            <FontAwesomeIcon icon={faRoad} color={"#144235"} />
            <Text>
              {state.distance
                ? state.distance.length > 3
                  ? `${state.distance.slice(0, 1)}.${state.distance.slice(
                      1,
                      3
                    )}km`
                  : `${state.distance}m`
                : null}
            </Text>
          </Column>
          <Column onClick={onHeartClick}>
            <FontAwesomeIcon icon={faHeart} color={heart ? "red" : "gray"} />
          </Column>
        </HeaderInfo>
      </Header>
      <InfoContainer>
        <SubTitle>상세정보</SubTitle>
        <Info>
          <FontAwesomeIcon icon={faMapMarked} color={"#144235"} />
          <InfoColumn>
            <InfoText>{state.road_address_name}</InfoText>
            <Text>{state.address_name}</Text>
          </InfoColumn>
        </Info>
        <Info>
          <FontAwesomeIcon icon={faPhone} color={"#144235"} />
          <InfoText>{state.phone ? state.phone : "-"}</InfoText>
        </Info>
      </InfoContainer>
      <Map id="kakao-detail-map"></Map>
    </Container>
  );
};

export default CafeDatail;

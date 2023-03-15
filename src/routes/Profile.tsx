import { sessionState } from "Atom";
import { useRecoilState } from "recoil";
import Cafe from "components/Cafe";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { ICafe } from "db/Cafe";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 480px;
  margin: 0 auto;
  background-color: #ffffff;
`;

const Title = styled.h1`
  font-size: 22px;
  margin-top: 70px;
`;

const Name = styled.span`
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Text = styled.span`
  opacity: 0.8;
  cursor: pointer;
  font-size: 15px;
  margin-top: 5px;
`;

const Lists = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 460px;
  margin: 0 auto;
  margin-top: 50px;
`;

const SubTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const NoCafe = styled.span`
  display: block;
  margin: 50px 0px;
`;

const Profile = () => {
  const [session, setSession] = useRecoilState(sessionState);
  const [cafes, setCafes] = useState<ICafe[]>([]);
  console.log(cafes);
  const navigate = useNavigate();
  const onLogout = async () => {
    setSession({ loggedIn: false, user: null });
    navigate("/");
    await fetch("http://localhost:8000/api/logout", {
      method: "POST",
      credentials: "include",
    });
  };
  const getCafes = async () => {
    const response = await fetch("http://localhost:8000/api/cafes", {
      credentials: "include",
    }).then((response) => response.json());
    setCafes(response.cafes);
  };
  useEffect(() => {
    getCafes();
  }, []);
  return (
    <Container>
      <Title>프로필</Title>
      <Name>{session.user?.userId}</Name>
      <Text onClick={onLogout}>로그아웃</Text>
      <Text>
        <Link to={"/change-password"}>비밀번호 변경</Link>
      </Text>
      <Lists>
        <SubTitle>나의 카페</SubTitle>
        {cafes && cafes.length > 0 ? (
          cafes.map((cafe) => <Cafe cafe={cafe} />)
        ) : (
          <NoCafe>찜한 카페가 존재하지 않습니다.</NoCafe>
        )}
      </Lists>
    </Container>
  );
};

export default Profile;

import { flashState, sessionState } from "Atom";
import { useRecoilState, useSetRecoilState } from "recoil";
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
  min-height: calc(100vh - 110px);
  margin: 0 auto;
  background-color: #ffffff;
`;

const Title = styled.h1`
  font-size: 22px;
  margin-top: 70px;
  margin-bottom: 20px;
`;

const Logout = styled.span`
  opacity: 0.8;
  cursor: pointer;
  font-size: 15px;
  margin-top: 5px;
`;

const ChangePassword = styled(Logout)``;

const Lists = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 460px;
  margin: 0 auto;
  margin-top: 80px;
`;

const SubTitle = styled.h3`
  width: 100%;
  font-size: 18px;
  font-weight: 500;
  margin: 0px 20px;
  margin-bottom: 20px;
  padding: 0px 10px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

const NoCafe = styled.span`
  display: block;
  margin: 50px 0px;
`;

const Profile = () => {
  const [cafes, setCafes] = useState<ICafe[]>([]);
  const setFlash = useSetRecoilState(flashState);
  const [session, setSession] = useRecoilState(sessionState);
  console.log(cafes);
  const navigate = useNavigate();
  const onLogout = async () => {
    setSession({ loggedIn: false, user: null });
    const response = await fetch("http://localhost:8000/api/logout", {
      method: "POST",
      credentials: "include",
    }).then((response) => response.json());
    setFlash(response.message);
    navigate("/");
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
      <Title>{session.user?.userId}의 프로필</Title>
      <Logout onClick={onLogout}>로그아웃</Logout>
      <ChangePassword>
        <Link to={"/change-password"}>비밀번호 변경</Link>
      </ChangePassword>
      <Lists>
        <SubTitle>나의 카페</SubTitle>
        {cafes && cafes.length > 0 ? (
          cafes.map((cafe) => <Cafe key={cafe.id} cafe={cafe} />)
        ) : (
          <NoCafe>찜한 카페가 존재하지 않습니다.</NoCafe>
        )}
      </Lists>
    </Container>
  );
};

export default Profile;

import { flashState, sessionState } from "Atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import Cafe from "components/Cafe";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { ICafe } from "db/Cafe";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 480px;
  min-height: calc(100vh - 110px);
  margin: 0 auto;
  padding: 0px 10px;
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
  width: 100%;
  margin: 0 auto;
  margin-top: 80px;
`;

const List = styled.div`
  width: 100%;
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
  let target = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const setFlash = useSetRecoilState(flashState);
  const [session, setSession] = useRecoilState(sessionState);
  const [cafes, setCafes] = useState<ICafe[]>([]);
  const [sliceCafes, setSliceCafes] = useState<ICafe[]>([]);
  const [lenght, setLenght] = useState(2);
  const [maxLenght, setMaxLenght] = useState(1);

  const callback: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && lenght < maxLenght) {
        observer.unobserve(entry.target);
        setLenght((pre) => pre + 1);
      }
    });
  };

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
    setSliceCafes(cafes.slice(0, 6 * lenght));
  }, [lenght]);

  useEffect(() => {
    if (cafes.length > 5) {
      setMaxLenght(Math.ceil(cafes.length / 3));
      setSliceCafes(cafes.slice(0, 6));
    } else {
      setSliceCafes(cafes);
    }
  }, [cafes]);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target.current) {
      observer = new IntersectionObserver(callback, { threshold: 0.8 });
      observer.observe(target.current as Element);
    }
    return () => observer?.disconnect();
  }, [sliceCafes]);

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
        {sliceCafes.length > 0 ? (
          sliceCafes.map((cafe) => (
            <List key={cafe.id} ref={target}>
              <Cafe cafe={cafe} />
            </List>
          ))
        ) : (
          <NoCafe>찜한 카페가 존재하지 않습니다.</NoCafe>
        )}
      </Lists>
    </Container>
  );
};

export default Profile;

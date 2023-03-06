import { sessionState } from "Atom";
import { useRecoilState } from "recoil";
import Cafe from "components/Cafe";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [session, setSession] = useRecoilState(sessionState);
  const navigate = useNavigate();
  const onLogout = async () => {
    setSession({ loggedIn: false, user: null });
    navigate("/");
    await fetch("http://localhost:8000/api/logout", {
      method: "POST",
      credentials: "include",
    });
  };
  return (
    <div>
      <span>{session.user?.userId}</span>
      <div onClick={onLogout}>Logout</div>
      {session.user?.cafes.map((cafe) => (
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
      ))}
    </div>
  );
};

export default Profile;

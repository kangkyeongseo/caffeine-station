import { sessionState } from "Atom";
import Cafe from "components/Cafe";
import React from "react";
import { useRecoilState } from "recoil";

const Profile = () => {
  const [session, setSession] = useRecoilState(sessionState);
  console.log(session);
  return (
    <div>
      <span>{session.user?.userId}</span>
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

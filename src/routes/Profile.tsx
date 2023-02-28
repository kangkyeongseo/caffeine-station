import { sessionState } from "Atom";
import React from "react";
import { useRecoilState } from "recoil";

const Profile = () => {
  const [session, setSession] = useRecoilState(sessionState);
  console.log(session);
  return (
    <div>
      <span>{session.user?.userId}</span>
    </div>
  );
};

export default Profile;

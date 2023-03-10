import { locationState } from "Atom";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

const useCenter = (getCenter: boolean, map: any) => {
  const setLocation = useSetRecoilState(locationState);
  useEffect(() => {
    if (getCenter) {
      const center = map.getCenter();
      setLocation({
        lat: Number(center.Ma),
        lon: Number(center.La),
      });
    }
  }, [getCenter]);
};

export default useCenter;

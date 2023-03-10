import { Location } from "Atom";
import { useState } from "react";

const useCurrentLocation = () => {
  const [location, setLocation] = useState<Location>({ lat: null, lon: null });
  const [loading, setLoading] = useState(true);
  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
      setLoading(false);
    });
  return { loading, location };
};

export default useCurrentLocation;

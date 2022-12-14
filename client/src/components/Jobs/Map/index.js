import { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import JobMarker from "./JobMarker";

const Map = ({ jobs }) => {
  const [center, setCenter] = useState();
  const zoom = 18;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setCenter({
        lat: latitude,
        lng: longitude,
      });
    });
  }, []);

  if (!center) {
    return null;
  }

  return (
    // Important! Always set the container height explicitly
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
      defaultCenter={center}
      defaultZoom={zoom}
    >
      <LocationMarkerIcon
        lat={center.lat}
        lng={center.lng}
        className="h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-yellow-500"
      />
      {jobs?.map((job) => (
        <JobMarker
          key={job?._id}
          job={job}
          lat={job?.location?.lat}
          lng={job?.location?.lng}
        />
      ))}
    </GoogleMapReact>
  );
};

export default Map;

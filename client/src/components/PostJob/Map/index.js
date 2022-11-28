import { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { LocationMarkerIcon } from '@heroicons/react/solid';
import Geocode from 'react-geocode';

Geocode.setApiKey(process.env.REACT_APP_API_KEY);
Geocode.setLanguage('en');

const Map = ({ selectedPosition, setSelectedPosition }) => {
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
      defaultCenter={
        selectedPosition?.lat && selectedPosition?.lng
          ? selectedPosition
          : center
      }
      defaultZoom={zoom}
      onClick={(pos) => {
        setSelectedPosition({
          lat: pos.lat,
          lng: pos.lng,
        });
      }}
    >
      <LocationMarkerIcon
        lat={center.lat}
        lng={center.lng}
        className="h-7 w-7 text-yellow-500"
      />

      {selectedPosition && (
        <LocationMarkerIcon
          lat={selectedPosition.lat}
          lng={selectedPosition.lng}
          className="h-7 w-7 text-primary-500"
        />
      )}
    </GoogleMapReact>
  );
};

export default Map;

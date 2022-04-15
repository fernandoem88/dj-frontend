import Image from "next/image";
import React from "react";
import Geocode from "react-geocode";
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { GEOCODE_API_KEY, MAP_BOX_API_TOKEN } from "@src/shared/config";

interface Props {
  event: any;
}
const setGeocodeApiKey = () => {
  console.log("GEOCODE_API_KEY", GEOCODE_API_KEY);
  Geocode.setApiKey(GEOCODE_API_KEY);
};
const EventMap: React.FC<Props> = (props) => {
  const [lat, setLat] = React.useState(40.712772);
  const [lng, setLng] = React.useState(-73.935242);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [viewport, setViewport] = React.useState({
    latitude: lat,
    longitude: lng,
    zoom: 12,
  });
  React.useState(() => setGeocodeApiKey());
  React.useEffect(() => {
    // Get latitude & longitude from address.
    Geocode.fromAddress(props.event.address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport((vp) => {
          return { ...vp, latitude: lat, longitude: lng };
        });
        setLoading(false);
      },
      (error) => {
        setError(error?.message || error || "something went wrong");
        setLoading(false);
      }
    );
  }, [props.event.address]);

  if (loading) return null;

  return (
    <>
      {!!error && <div>{error}</div>}
      <ReactMapGL
        {...viewport}
        mapboxAccessToken={MAP_BOX_API_TOKEN}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onMove={(e) => setViewport(e.viewState)}
      >
        <Marker color="red" latitude={lat} longitude={lng} />
      </ReactMapGL>
    </>
  );
};
export type EventMapProps = Props;
export default React.memo(EventMap);

import { Fragment, useState } from "react";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";

const markers = [
  {
    id: 1,
    name: "Samaki Poa",
    position: { lat: -4.0069006, lng: 39.6813321 },
  },
  {
    id: 2,
    name: "Kongowea",
    position: { lat: -4.04532, lng: 39.6830291 },
  },
  {
    id: 3,
    name: "SeaFood Boil Mombasa",
    position: { lat: -4.046617, lng: 39.683091 },
  },
	{
    id: 4,
    name: "Bamburi Fisheries",
    position: { lat: -4.0009821, lng: 39.7035657 },
  },
	{
    id: 5,
    name: "Mtwapa Fish Wholesale",
    position: { lat: -3.971662, lng: 39.6840049 },
  }
];

function GoogleMaps() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return (
    <Fragment>
      <div className="container">
        <div style={{ height: "400px", width: "400px" }}>
          {isLoaded ? (
            <GoogleMap
              center={{ lat: -4.05483, lng: 39.66919 }}
              zoom={10}
              onClick={() => setActiveMarker(null)}
              mapContainerStyle={{ width: "100%", height: "400px" }}
            >
              {markers.map(({ id, name, position }) => (
                <MarkerF
                  key={id}
                  position={position}
                  onClick={() => handleActiveMarker(id)}
                  // icon={{
                  //   url:"https://t4.ftcdn.net/jpg/02/85/33/21/360_F_285332150_qyJdRevcRDaqVluZrUp8ee4H2KezU9CA.jpg",
                  //   scaledSize: { width: 50, height: 50 }
                  // }}
                >
                  {activeMarker === id ? (
                    <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                      <div>
                        <p>{name}</p>
                      </div>
                    </InfoWindowF>
                  ) : null}
                </MarkerF>
              ))}
            </GoogleMap>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
}

export default GoogleMaps;
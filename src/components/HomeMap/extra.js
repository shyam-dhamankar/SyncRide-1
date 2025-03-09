import React from 'react';
import { Image } from 'react-native';
import { Marker } from 'react-native-maps';
import cars from '../../assets/data/cars';

const ExtraMarkers = () => {
  const getImage = (type) => {
    if (type === "UberX") {
      return require("../../assets/images/UberX.jpeg");
    } else if (type === "UberXL") {
      return require("../../assets/images/UberXL.jpeg");
    } else {
      return require("../../assets/images/Comfort.jpeg");
    }
  };

  return (
    <>
      {cars.map((car) => (
        <Marker
          key={car.id}
          coordinate={{
            latitude: car.latitude,
            longitude: car.longitude,
          }}
          title={car.type}
        >
          <Image
            source={getImage(car.type)}
            style={{
              width: 50,
              height: 50,
              resizeMode: 'contain',
            }}
          />
        </Marker>
      ))}
    </>
  );
};

export default ExtraMarkers;
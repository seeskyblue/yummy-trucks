'use client';

import { Text } from '@chakra-ui/react';
import { LatLngExpression, icon } from 'leaflet';
import shadowImage from 'leaflet/dist/images/marker-shadow.png';
import positionImage from 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import truckImage from './food-truck.png';
import MapCenter from './MapCenter';
import MyLocatorControl from './MyLocatorControl';

import { useGeoContext } from '@/context/GeoProvider';

interface Props {
  center?: LatLngExpression;
  markers: Schema.Truck[];
}

// eslint-disable-next-line no-magic-numbers
const CENTER_OF_FRANCISCO = [37.7749, -122.4194] as LatLngExpression;
const truckIcon = icon({ iconUrl: truckImage.src, shadowUrl: shadowImage.src });
const myPositionIcon = icon({ iconUrl: positionImage.src, shadowUrl: shadowImage.src });

export default function TruckMap(props: Props) {
  const { center = CENTER_OF_FRANCISCO, markers } = props;
  const { position } = useGeoContext();
  const myPosition =
    position && ([position?.coords.latitude, position?.coords.longitude] as LatLngExpression);

  return (
    <MapContainer
      style={{ height: 'calc(100vh - 72px)', width: '100%' }}
      center={center}
      zoom={20}
      scrollWheelZoom
    >
      <MapCenter center={center} />
      <MyLocatorControl relocatePosition={myPosition} />
      {myPosition && (
        <Marker position={myPosition} icon={myPositionIcon}>
          <Popup autoClose>
            <Text>{"You're here."}</Text>
          </Popup>
        </Marker>
      )}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker) => (
        <Marker
          key={marker.locationid}
          position={[marker.latitude, marker.longitude]}
          icon={truckIcon}
        >
          <Popup autoClose>
            <Text fontSize="md" fontWeight="bold">
              {marker.applicant}
            </Text>
            <Text whiteSpace="break-spaces">{marker.locationDescription}</Text>
            <Text whiteSpace="break-spaces">{marker.foodItems}</Text>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

import { LatLngExpression } from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface Props {
  center: LatLngExpression;
}

export default function MapCenter(props: Props) {
  const { center } = props;

  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center);
  }, [center, map]);

  return null;
}

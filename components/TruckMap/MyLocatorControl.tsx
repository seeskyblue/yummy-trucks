'use client';

import { Box } from '@chakra-ui/react';
import { LatLngExpression } from 'leaflet';
import Image from 'next/image';
import { useMap } from 'react-leaflet';

import locatorImage from './locator.svg';

const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
};

interface Props {
  controlPosition?: keyof typeof POSITION_CLASSES;
  relocatePosition?: LatLngExpression;
}

export default function MyLocatorControl(props: Props) {
  const { controlPosition: position, relocatePosition } = props;

  const positionClass = (position && POSITION_CLASSES[position]) || POSITION_CLASSES.bottomleft;

  const map = useMap();
  const handleClick = () => {
    if (relocatePosition) {
      map.flyTo(relocatePosition);
    }
  };

  return (
    <Box className={positionClass}>
      <Box
        className="leaflet-control leaflet-bar"
        bg="white"
        cursor="pointer"
        onClick={handleClick}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
        <Image src={locatorImage.src} alt="my locator" width={30} height={30} />
      </Box>
    </Box>
  );
}

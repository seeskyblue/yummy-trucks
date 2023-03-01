'use client';

import { createContext, useContext, useMemo } from 'react';

import { useGeoPosition } from './useGeoPosition';

interface GeoContext {
  position?: GeolocationPosition;
  error?: GeolocationPositionError;
  supported: boolean;
}

const GeoContext = createContext<GeoContext | null>(null);

interface Props {
  children?: React.ReactNode;
}

export default function GeoProvider(props: Props) {
  const { children } = props;

  const contextValue = useGeoContextValue();

  return <GeoContext.Provider value={contextValue}>{children}</GeoContext.Provider>;
}

function useGeoContextValue() {
  const { position, error } = useGeoPosition();

  return useMemo(
    () => ({
      position,
      error,
      supported: global.navigator?.geolocation != null,
    }),
    [error, position],
  );
}

export function useGeoContext() {
  const context = useContext(GeoContext);

  if (context == null) {
    throw new Error("Can't find `GeoContext` in upper nodes of Virtual DOM tree. ");
  }

  return context;
}

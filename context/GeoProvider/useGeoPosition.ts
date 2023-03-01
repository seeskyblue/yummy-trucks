'use client';

import { useCallback, useEffect, useState } from 'react';

const DEFAULT_OPTIONS: PositionOptions = {
  enableHighAccuracy: false,
  timeout: Infinity,
  maximumAge: 0,
};

export const useGeoPosition = (watch = false, userSettings: PositionOptions = {}) => {
  const { enableHighAccuracy, timeout, maximumAge } = { ...DEFAULT_OPTIONS, ...userSettings };

  const [position, setPosition] = useState<GeolocationPosition>();
  const [error, setError] = useState<GeolocationPositionError>();

  const onChange: PositionCallback = useCallback((changedPosition) => {
    setPosition(changedPosition);
    setError(undefined);
  }, []);

  const onError: PositionErrorCallback = useCallback((newError) => {
    setError(newError);
  }, []);

  useEffect(() => {
    if (!global.navigator?.geolocation) return;

    const option = { enableHighAccuracy, timeout, maximumAge };

    if (watch) {
      const watcher = global.navigator.geolocation.watchPosition(onChange, onError, option);
      return () => global.navigator.geolocation.clearWatch(watcher);
    }

    navigator.geolocation.getCurrentPosition(onChange, onError, option);
  }, [watch, enableHighAccuracy, timeout, maximumAge, onChange, onError]);

  return { position, error };
};

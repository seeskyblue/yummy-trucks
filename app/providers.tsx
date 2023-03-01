'use client';

import { ChakraProvider } from '@chakra-ui/react';

import GeoProvider from '@/context/GeoProvider';

interface Props {
  children: React.ReactNode;
}

export default function Providers(props: Props) {
  const { children } = props;

  return (
    <ChakraProvider resetCSS>
      <GeoProvider>{children}</GeoProvider>
    </ChakraProvider>
  );
}

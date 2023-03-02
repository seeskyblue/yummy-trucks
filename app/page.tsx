'use client';

import useRequest from '@ahooksjs/use-request';
import { Box, Flex, Wrap, WrapItem } from '@chakra-ui/react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FixedSizeList } from 'react-window';

import Header from './header';

import TruckCard from '@/components/TruckCard';

const TruckMap = dynamic(() => import('components/TruckMap'), { ssr: false });
const headerHeight = 72;

export default function Home() {
  const [datasource = [], handleSearch] = useSearch();
  const widnowHeight = useWindowHeight();

  const [currentTruck, setCurrentTruck] = useState<Schema.Truck>();
  useEffect(() => {
    if (datasource.length > 1) setCurrentTruck((prev) => prev ?? datasource[0]);
  }, [datasource]);
  const handleListItemClick = (truck: Schema.Truck) => () => {
    setCurrentTruck(truck);
  };

  return (
    <Box as="main" height="100vh" width="100vw" flexFlow="column" overflow="hidden">
      <Box>
        <Header height={headerHeight} onSearch={handleSearch} />
      </Box>
      <Flex
        height={`calc(100vh - ${headerHeight}px)`}
        flex="auto"
        flexFlow="row"
        alignItems="stretch"
      >
        <Wrap width="320px" height="100%" overflow="hidden">
          <FixedSizeList
            itemCount={datasource.length}
            itemSize={160}
            height={widnowHeight - headerHeight - 8} // reduce chakra wrap item vertical margin
            width={320}
          >
            {({ index, style }) => {
              const data = datasource[index];
              return (
                <WrapItem
                  cursor="pointer"
                  key={data.locationid}
                  style={style}
                  _notLast={{ borderBottom: '1px solid', borderColor: 'gray.200' }}
                  onClick={handleListItemClick(data)}
                >
                  <TruckCard data={data} />
                </WrapItem>
              );
            }}
          </FixedSizeList>
        </Wrap>
        <Box flex="auto">
          <TruckMap
            center={currentTruck && [currentTruck.latitude, currentTruck.longitude]}
            markers={datasource}
          />
        </Box>
      </Flex>
    </Box>
  );
}

async function getData(search?: string, postion?: [number, number]) {
  const res = await axios.get<Schema.Truck[]>('/api/trucks', { params: { search, postion } });
  return res.data;
}

function useSearch() {
  const [search, setSearch] = useState<string>();
  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const { data = [] } = useRequest(getData);
  const searchedData = useMemo(
    () =>
      search ? data?.filter((d) => d.applicant.toLowerCase().includes(search.toLowerCase())) : data,
    [data, search],
  );

  return [searchedData, handleSearch] as const;
}

function useWindowHeight(initialHeight = 500) {
  const [height, setHeight] = useState(initialHeight);

  useEffect(() => {
    setHeight(global.document.body.getBoundingClientRect().height);
  }, []);

  return height;
}

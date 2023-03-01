'use client';

import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  Collapse,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  height: number;
  onSearch: (search: string) => void;
}

export default function Header(props: Props) {
  const { onSearch, height } = props;

  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const searchProps = useSearchInput((value: string) => {
    onSearch(value);
    if (value) onClose();
  });

  return (
    <Collapse in={isOpen} style={{ zIndex: 10 }} startingHeight={height} endingHeight="100vh">
      <Flex
        flexFlow={isOpen ? 'column' : 'row'}
        justifyContent={isOpen ? 'start' : 'center'}
        height="100%"
        zIndex={99}
        px="8"
        mb="4"
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        <Center py={isOpen ? '20' : 0}>
          <Image src="/logo.svg" width={isOpen ? 384 : 64} height={isOpen ? 384 : 64} alt="logo" />
        </Center>
        <Center alignItems="center">
          <Box>
            <InputGroup ml="4" textAlign="center">
              <InputLeftElement>
                <SearchIcon />
              </InputLeftElement>
              <Input width={isOpen ? 560 : 720} {...searchProps} placeholder="Search the truck" />
            </InputGroup>
          </Box>
        </Center>
      </Flex>
    </Collapse>
  );
}

function useSearchInput(onSearch: Props['onSearch']) {
  const [value, setValue] = useState<string>('');

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') onSearch(value);
  };

  return { value, onChange, onKeyDown };
}

import * as React from 'react';
import {
  Box,
  Center,
  Collapse,
  HStack,
  SimpleGrid,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import Link from 'next/link';
//import { links } from './_data';
import { ChevronRightIcon } from '@components/icons';

type Props = { isOpen: boolean }

export const ResourcesMenu = ({ isOpen }: Props) => (
  <Collapse in={isOpen} animateOpacity unmountOnExit={false}>
    <Box
      w="full"
      shadow="lg"
      pos="absolute"
      insetX={0}
      top="16"
      py="12"
      px="4"
      bgGradient="linear(to-b, gray.900, gray.800)"
    >
      <Box maxW="7xl" mx="auto" px="8">
        
      </Box>
    </Box>
  </Collapse>
);
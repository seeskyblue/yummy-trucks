import { Box, Text } from '@chakra-ui/react';

interface Props {
  data: Schema.Truck;
}

export default function TruckCard(props: Props) {
  const { data } = props;

  return (
    <Box padding="4" display="block">
      <Text noOfLines={1} size="md" fontWeight="bold">
        {data.applicant}
      </Text>
      <Text fontSize="xs" noOfLines={2} title={data.foodItems} color="gray.500" my="2">
        {data.locationDescription}
      </Text>
      <Text fontSize="sm" noOfLines={2} title={data.foodItems}>
        {data.foodItems}
      </Text>
    </Box>
  );
}

import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Igo Carvalho</Text>
        <Text color="gray.300" fontSize="small">
          igocarvalho00@gmail.com
        </Text>
      </Box>

      <Avatar
        size="md"
        name="Igo Carvalho"
        src="https://github.com/igocarvalho.png"
      />
    </Flex>
  );
}

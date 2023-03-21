import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

type ProfileProps = {
  showProfileData?: boolean;
};

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Igo Carvalho</Text>
          <Text color="gray.300" fontSize="small">
            igocarvalho00@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Igo Carvalho"
        src="https://github.com/igocarvalho.png"
      />
    </Flex>
  );
}

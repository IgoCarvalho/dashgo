import { Button } from '@chakra-ui/react';

type PaginationItemProps = {
  isCurrent?: boolean;
  number: number;
  onPageChange: (page: number) => void;
};

export function PaginationItem({
  number,
  onPageChange,
  isCurrent = false,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        w="4"
        colorScheme="yellow"
        disabled
        _disabled={{
          bg: 'yellow.500',
          cursor: 'default',
        }}
      >
        {number}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      w="4"
      bgColor="gray.700"
      _hover={{ bg: 'gray.500' }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  );
}

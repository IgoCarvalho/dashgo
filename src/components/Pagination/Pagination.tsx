import { Box, HStack, Stack, Text } from '@chakra-ui/react';

import { PaginationItem } from './PaginationItem';

type PaginationProps = {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  siblingPagesCount?: number;
  onPageChange: (page: number) => void;
};

function generatePagesArray(from: number, to: number, siblings: number) {
  const previousPages = [...new Array(siblings)]
    .map((_, index) => from - (index + 1))
    .filter((page) => page > 0)
    .sort();

  const nextPages = [...new Array(siblings)]
    .map((_, index) => from + (index + 1))
    .filter((page) => page <= to);

  return { previousPages, nextPages };
}

export function Pagination({
  totalCountOfRegisters,
  onPageChange,
  currentPage = 1,
  registersPerPage = 10,
  siblingPagesCount = 2,
}: PaginationProps) {
  const registersStart = registersPerPage * (currentPage - 1);
  const registersEnd = registersStart + registersPerPage;

  const lastPage = Math.floor(totalCountOfRegisters / registersPerPage);

  const { previousPages, nextPages } = generatePagesArray(
    currentPage,
    lastPage,
    siblingPagesCount
  );

  return (
    <Stack
      direction={['column', 'row']}
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <Text as="strong">{registersStart}</Text> -{' '}
        <Text as="strong">{registersEnd}</Text> de{' '}
        <Text as="strong">{totalCountOfRegisters}</Text>
      </Box>

      <HStack>
        {currentPage > siblingPagesCount + 1 && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />

            {currentPage > siblingPagesCount + 2 && (
              <Text color="gray.300" width="6" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map((page) => (
            <PaginationItem
              onPageChange={onPageChange}
              key={page}
              number={page}
            />
          ))}

        <PaginationItem
          onPageChange={onPageChange}
          number={currentPage}
          isCurrent
        />

        {nextPages.length > 0 &&
          nextPages.map((page) => (
            <PaginationItem
              onPageChange={onPageChange}
              key={page}
              number={page}
            />
          ))}

        {currentPage + siblingPagesCount < lastPage && (
          <>
            {currentPage + 1 + siblingPagesCount < lastPage && (
              <Text color="gray.300" width="6" textAlign="center">
                ...
              </Text>
            )}
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}
      </HStack>
    </Stack>
  );
}

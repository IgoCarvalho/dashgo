import { Box, Flex, SimpleGrid, Text, theme } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

import { Header } from '@/components/Header/Header';
import { Sidebar } from '@/components/Sidebar/Sidebar';

const options: ApexCharts.ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      '2023-03-17T00:00:00Z',
      '2023-03-18T00:00:00Z',
      '2023-03-19T00:00:00Z',
      '2023-03-20T00:00:00Z',
      '2023-03-21T00:00:00Z',
      '2023-03-22T00:00:00Z',
      '2023-03-23T00:00:00Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};
const series: ApexAxisChartSeries = [
  {
    name: 'ad',
    data: [31, 12, 323, 114, 65, 226, 137],
  },
];

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" mx="auto" maxW={1480} px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth={320}>
          <Box p={['6', '8']} bg="gray.800" borderRadius="8" pb="4">
            <Text fontSize="lg" mb="4">
              Inscritos da semana
            </Text>

            <Chart type="area" height={160} options={options} series={series} />
          </Box>

          <Box p={['6', '8']} bg="gray.800" borderRadius="8" pb="4">
            <Text fontSize="lg" mb="4">
              Taxa de abertura
            </Text>

            <Chart type="area" height={160} options={options} series={series} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}

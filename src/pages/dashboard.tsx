import dynamic from "next/dynamic";
import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
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
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      "2022-01-22T00:00:00.000Z",
      "2022-01-23T00:00:00.000Z",
      "2022-01-24T00:00:00.000Z",
      "2022-01-25T00:00:00.000Z",
      "2022-01-26T00:00:00.000Z",
      "2022-01-27T00:00:00.000Z",
      "2022-01-28T00:00:00.000Z",
      "2022-01-29T00:00:00.000Z",
    ],
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const series = [{ name: "series1", data: [18, 20, 39, 56, 44, 12, 9, 10] }];

export default function Dashboard() {
  return (
    <Flex direction='column' h='100vh'>
      <Header />

      <Flex w='100%' my='6' maxWidth='1480px' mx='auto' px='6'>
        <Sidebar />

        <SimpleGrid flex='1' gap='4' minChildWidth='320px' align='flex-start'>
          <Box p={["6", "8"]} bg='gray.800' borderRadius={8} pb='4'>
            <Text fontSize='lg'>Inscritos da semana</Text>
            <Chart options={options} series={series} type='area' height={160} />
          </Box>

          <Box p={["6", "8"]} bg='gray.800' borderRadius={8} pb='4'>
            <Text fontSize='lg'>Taxa de abertura</Text>
            <Chart options={options} series={series} type='area' height={160} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}

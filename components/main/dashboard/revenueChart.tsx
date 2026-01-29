"use client";

import { ApexChart } from "@/components/charts/apexChart";
import numeral from 'numeral'
import React from "react";

export default function RevenueChart({
  chartData,
}: {
  chartData?: {
    data: number[];
    name: string;
  }[];
}) {

  const ctg = ['Jan', "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

  const chartOptions = {
    chart: {
      id: "area",
      toolbar: { show: false },
      zoom: { enabled: false }, // Disable zooming
      pan: { enabled: false }, // Disable panning
      selection: { enabled: false },
    },
    dataLabels: {
      enabled: false
    },
    colors: ["#0C2A46", "#F08E10"],
    fill: {
      type: "gradient",
      colors: ["#0C2A46", "#F08E10"],
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.2,
        opacityTo: 0.6,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: ctg,
      // labels: { show: false }
    },
    yaxis: {

      labels: {
        formatter: (e: number) => {
          const formatNumInThousand = (
            value: string,
          ) => {
            return numeral(value).format("0a");

          };

          return formatNumInThousand(e?.toString())
        },
      },


    },

    stroke: {
      curve: "smooth",

    },
    markers: {
      size: 4,
    },
    grid: {
      borderColor: "#e7e7e7",
      stroke: {
        curve: "smooth",
        width: 2,
        dashArray: 26,
      },
    },
  };

  const valueChartData = [
    { name: "Consultation", data: [100000, 200000, 300000, 450000, 500000, 700000, 110000, 300000, 320000, 900000, 600000, 390000] },
    { name: "Template", data: [20000, 900000, 100000, 250000, 300000, 600000, 310000, 100000, 620000, 500000, 400000, 90000] },
  ]



  return (
    <section className="w-full overflow-hidden bg-white rounded-2xl p-5">
      <ApexChart
        options={chartOptions}
        data={valueChartData}
        type="area"
      />
    </section>
  );
}

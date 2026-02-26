"use client";

import { ApexChart } from "@/components/charts/apexChart";
import Field from "@/components/ui/field";
import { RevenueGraphType } from "@/types/booking";
import { formatDate, formatNumInThousands } from "@/utils/helper";
import numeral from "numeral";
import React, { useMemo } from "react";

export default function RevenueChart({
  chartData,
}: {
  chartData?: RevenueGraphType[];
}) {
  const ctg = chartData?.map(
    (item) => formatDate(new Date(item?.date)),
    "short",
  );

  const chartOptions = {
    chart: {
      id: "area",
      toolbar: { show: false },
      zoom: { enabled: false }, // Disable zooming
      pan: { enabled: false }, // Disable panning
      selection: { enabled: false },
    },
    dataLabels: {
      enabled: false,
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
          const formatNumInThousand = (value: string) => {
            return numeral(value).format("0a");
          };

          return formatNumInThousand(e?.toString());
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
    {
      name: "Consultation",
      data: chartData?.map((item) => item?.bookingRevenue),
    },
    {
      name: "Template",
      data: chartData?.map((item) => item?.templateRevenue),
    },
  ];

  return (
    <section className="w-full overflow-x-auto rounded-2xl bg-white p-5">
      <ApexChart options={chartOptions} data={valueChartData} type="area" />
    </section>
  );
}

export const RevenueStats = ({
  chartData,
}: {
  chartData?: RevenueGraphType[];
}) => {
  const totalConsultation = useMemo(
    () =>
      chartData?.reduce(
        (accumulator, currentValue) =>
          accumulator + (currentValue?.bookingRevenue || 0),
        0,
      ) ?? 0,
    [chartData],
  );
  const totalTemplates = useMemo(
    () =>
      chartData?.reduce(
        (accumulator, currentValue) =>
          accumulator + (currentValue?.templateRevenue || 0),
        0,
      ) ?? 0,
    [chartData],
  );

  return (
    <div className="space-y-6">
      <h2>Revenue</h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Field
          label="Consultations"
          value={`$${formatNumInThousands(totalConsultation)}`}
        />
        <Field
          label="Templates"
          value={`$${formatNumInThousands(totalTemplates)}`}
        />
      </div>
    </div>
  );
};

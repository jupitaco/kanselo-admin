"use client";
import { cn } from "../../libs/utils";
import dynamic from "next/dynamic";

type ApexTypesPops =
  | "line"
  | "area"
  | "bar"
  | "pie"
  | "donut"
  | "radialBar"
  | "scatter"
  | "bubble"
  | "heatmap"
  | "candlestick"
  | "boxPlot"
  | "radar"
  | "polarArea"
  | "rangeBar"
  | "rangeArea"
  | "treemap"
  | undefined;

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export const ApexChart = ({
  className,
  data,
  options,
  height,
  type = "line",
}: {
  className?: string;
  data: any;
  options: any;
  height?: number;
  type?: ApexTypesPops;
}) => {
  return (
    <main className={cn("w-full", className)}>
      <ReactApexChart
        options={options}
        series={data}
        type={type}
        height={height || 350}
      />
    </main>
  );
};

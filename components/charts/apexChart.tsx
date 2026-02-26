"use client";
import { useEffect, useRef, useState } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState<string>("100%");

  useEffect(() => {
    if (!data?.[0]?.data || !options?.xaxis?.categories) return;

    const dataPoints = data[0].data.length;
    const categories = options.xaxis.categories.length;

    // Calculate width based on number of data points
    // Adjust these values based on your chart type
    const minWidth = 800; // minimum width in pixels
    let widthPerPoint = 50; // pixels per data point

    // Adjust for bar charts (need more space)
    if (type === "bar") {
      widthPerPoint = 80;
    }

    const calculatedWidth = Math.max(minWidth, dataPoints * widthPerPoint);
    setChartWidth(`${calculatedWidth}px`);
  }, [data, options, type]);

  // Check if scroll is needed
  const needsScroll = () => {
    if (!containerRef.current) return false;
    return containerRef.current.scrollWidth > containerRef.current.clientWidth;
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full overflow-x-auto overflow-y-hidden", // Only X scroll, hide Y scroll
        "xcustom-scrollbar",
        className,
      )}
      style={{
        // Ensure Y axis doesn't scroll
        overflowY: "hidden",
      }}
    >
      <div style={{ minWidth: chartWidth, width: "100%" }}>
        <ReactApexChart
          options={{
            ...options,
            chart: {
              ...options?.chart,
              width: chartWidth,
              toolbar: {
                show: true,
                ...options?.chart?.toolbar,
              },
            },
          }}
          series={data}
          type={type}
          height={height || 350}
        />
      </div>
    </div>
  );
};

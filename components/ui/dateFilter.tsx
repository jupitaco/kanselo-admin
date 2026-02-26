"use client";

import { FC, useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Calendar } from "./formInput/datePicker/calendar";
import Button from "./button";
import { cn } from "@/libs/utils";
import { FaChevronDown } from "react-icons/fa6";
import { DateRange } from "react-day-picker";
import PopoverWrapper from "./popover/popoverWrapper";

interface SelectDateFilter {
  startDate?: string;
  endDate?: string;
}

export const SelectDateFilter: FC<SelectDateFilter> = ({
  startDate,
  endDate,
}) => {
  const { startDateValue, endDateValue, handleDate, clearDate, isPending } =
    useDateFilter();
  const [openDate, setOpenDate] = useState(false);

  // Initialize from URL
  const [date, setDate] = useState<DateRange | undefined>(() => ({
    from: startDateValue ? new Date(startDateValue) : undefined,
    to: endDateValue ? new Date(endDateValue) : undefined,
  }));

  // Update when URL changes
  useEffect(() => {
    setDate({
      from: startDateValue ? new Date(startDateValue) : undefined,
      to: endDateValue ? new Date(endDateValue) : undefined,
    });
  }, [startDateValue, endDateValue]);

  const handleApplyDate = () => {
    if (date?.from && date?.to) {
      handleDate(date.from, date.to);
      setOpenDate(false);
    }
  };

  const handleClearDate = () => {
    clearDate();
    setDate({ from: undefined, to: undefined });
    setOpenDate(false);
  };

  return (
    <PopoverWrapper
      triggerChildren={
        <button
          className={cn(
            "btn outline-btn min-h-10! px-2! text-xs!",
            isPending && "cursor-wait opacity-50",
          )}
        >
          <FaChevronDown />
          <span>
            {date?.from || date?.to
              ? `${date.from?.toLocaleDateString() || "?"} - ${date.to?.toLocaleDateString() || "?"}`
              : "Select dates"}
          </span>
        </button>
      }
    >
      <section className="space-y-3 bg-white p-0">
        <Calendar
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          className="border-Line rounded-md border"
          // Add caption layout to show month/year clearly
          captionLayout="dropdown"
        />
        <div className="flex w-full items-center justify-start gap-x-2 px-5 pb-6">
          <Button
            onClick={handleClearDate}
            className="outline-btn min-h-10! flex-1 px-3!"
            disabled={isPending}
          >
            Clear Date
          </Button>
          <Button
            onClick={handleApplyDate}
            disabled={!date?.from || !date?.to || isPending}
            className="pry-btn min-h-10! flex-1 px-3!"
            loading={isPending}
          >
            Apply Date
          </Button>
        </div>
      </section>
    </PopoverWrapper>
  );
};

export function useDateFilter() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const startDateValue = searchParams.get("startDate");
  const endDateValue = searchParams.get("endDate");

  const handleDate = (
    startDate: Date | undefined,
    endDate: Date | undefined,
  ) => {
    const params = new URLSearchParams(searchParams);

    if (startDate) {
      // Use a consistent date format
      params.set("startDate", startDate.toISOString().split("T")[0]);
    } else {
      params.delete("startDate");
    }

    if (endDate) {
      params.set("endDate", endDate.toISOString().split("T")[0]);
    } else {
      params.delete("endDate");
    }

    startTransition(() => {
      replace(`${pathName}?${params.toString()}`, { scroll: false });
    });
  };

  const clearDate = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("startDate");
    params.delete("endDate");

    startTransition(() => {
      replace(`${pathName}?${params.toString()}`, { scroll: false });
    });
  };

  return {
    startDateValue,
    endDateValue,
    handleDate,
    clearDate,
    isPending,
  };
}

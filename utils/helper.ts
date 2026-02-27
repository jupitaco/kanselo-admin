import { toast } from "@/hooks/useToast";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleSuccess = (
  message: string,
  push?: (href: string, options?: NavigateOptions) => void,
  path?: string,
) => {
  if (path && push) {
    toast({
      variant: "default",
      title: "Success",
      description: message,
    });
    push(path);
  } else {
    toast({
      variant: "default",
      title: "Success",
      description: message,
    });
  }
};

export const handleError = (message: string) => {
  toast({
    variant: "destructive",
    title: "Failed",
    description: message,
  });
};

export const formatNumInThousands = (number: number | string) => {
  const numericValue = Number(number);
  if (Number.isNaN(numericValue)) {
    return "0.0";
  }
  // convert to string and split into different part
  const [intPart, originalDecimalPart] = number?.toString()?.split(".");

  // reverse to start formartting from right hand
  const reversedNum = intPart.split("").reverse().join("");

  // loop through the value and add , after every 3 chars
  const formattedVal = reversedNum
    .match(/.{1,3}/g)
    ?.join(",")
    .split("")
    .reverse()
    .join("");

  let decimalPart = originalDecimalPart || "00";
  if (decimalPart.length === 1) {
    decimalPart += "0";
  }

  return formattedVal + "." + Number(decimalPart);
};

export const formatDate = (date: Date, monthType?: "short" | "long") => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: monthType || "short",
    day: "numeric",
  });
};

export const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "numeric",
  });
};

export const getStatusColors = (status: string) => {
  const statusLower = status?.toLowerCase();

  if (
    [
      "active",
      "approved",
      "completed",
      "successful",
      "success",
      "verified",
      "confirmed",
      "requested",
      "credit",
    ].includes(statusLower)
  ) {
    return "success";
  }

  if (
    [
      "declined",
      "failed",
      "timedout",
      "rejected",
      "cancelled",
      "debit",
    ]?.includes(statusLower)
  ) {
    return "failed";
  }

  if (["pending", "processing"]?.includes(statusLower)) {
    return "warning";
  }

  return "fall-back";
};

export const queryBuilder = (query: { [key: string]: string }) => {
  const filteredParams = Object.entries(query).filter(
    ([_, v]) => v !== undefined && v !== "undefined" && v !== null && v !== "",
  );

  const params = new URLSearchParams(filteredParams);
  return params;
};

export const getDayXAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

export const formatDateToLocale = (date: Date) => {
  //  will return the date as YYYY-MM-DD
  return new Intl.DateTimeFormat("en-CA").format(date);
};

export function debouncer<T>(func: (val: T) => void, delay: number) {
  let timeoutId: NodeJS.Timeout | null = null;

  return (val: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(val);
    }, delay);
  };
}

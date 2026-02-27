"use client";
import { cn } from "@/libs/utils";
import React, { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { CopyIcon } from "@/public/svgs/svgs";

const CopyToClipboardBtn = ({
  id,
  valueToCopy,
  className,
  title,
}: {
  id: string | number;
  valueToCopy: string;
  className?: string;
  title?: string;
}) => {
  const handleCopyToClipboard = (id: string | number, val: string) => {
    if (id) {
      navigator.clipboard.writeText(val);
    }
  };

  const [clicked, setClicked] = useState<boolean>(false);
  const handleCopy = () => {
    setClicked(!clicked);
    handleCopyToClipboard(id, valueToCopy);
  };

  useEffect(() => {
    if (clicked) {
      setTimeout(() => {
        setClicked(!clicked);
      }, 1000);
    }
  }, [clicked]);

  return (
    <button onClick={handleCopy} className={className}>
      {clicked ? (
        <span className="animate__animated animate__bounceIn text-positive">
          <FaCircleCheck />
        </span>
      ) : (
        <span className={cn("text-Grey6 flex items-center gap-2", className)}>
          <CopyIcon />
          {title}
        </span>
      )}
    </button>
  );
};

export default CopyToClipboardBtn;

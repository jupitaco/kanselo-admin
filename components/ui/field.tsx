import { ReactNode } from "react";

const Field = ({
  label,
  value,
  className,
  valueClassName,
  labelClassName,
}: {
  label: string | ReactNode;
  value: string | ReactNode;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
}) => {
  return (
    <div className={className}>
      <h5 className={`text-grey-400  text-xs ${labelClassName}`}>{label}</h5>
      <>
        {typeof value === "string" ? (
          <h5 className={`text-sm font-medium ${valueClassName}`}>
            {value}
          </h5>
        ) : (
          value
        )}
      </>
    </div>
  );
};

export default Field;

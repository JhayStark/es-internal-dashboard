import React from "react";

// Has active and inactive
export const StatsTabOption1 = ({
  title,
  icon,
  value,
  subValue,
  iconColor,
}) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-3xl">
      <div className="flex flex-row items-center justify-between">
        <p className="text-xl font-semibold">{title}</p>
        <div className={`${iconColor} text-3xl`}>{icon}</div>
      </div>
      <p className="py-6 text-2xl font-semibold text-center text-[#055189]">
        {value}
      </p>
      <div className="flex flex-row justify-between">
        <div>
          <p className="text-sm font-medium">Active</p>
          <p className="text-[#0D7940] font-semibold">{subValue}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Inactive</p>
          <p className="text-[#FF0000] font-semibold">{subValue}</p>
        </div>
      </div>
    </div>
  );
};

export const StatsTabOption2 = ({
  title,
  icon,
  value,
  subValue,
  iconColor,
}) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-3xl">
      <div className="flex flex-row items-center justify-between">
        <p className="text-xl font-semibold">{title}</p>
        <div className={`${iconColor} text-3xl`}>{icon}</div>
      </div>
      <p className="py-6 text-2xl font-semibold text-center text-[#055189]">
        {value}
      </p>
      <div className="flex flex-row justify-between">
        <div>
          <p className="text-sm font-medium">Scheduled</p>
          <p className="text-[#0D7940] font-semibold">{subValue}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Delivered</p>
          <p className="text-[#FF0000] font-semibold">{subValue}</p>
        </div>
      </div>
    </div>
  );
};

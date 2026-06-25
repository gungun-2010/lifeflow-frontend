import React from "react";

const DashboardCard = ({
  title,
  value,
  icon,
  color
}) => {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-md
        hover:shadow-xl
        transition-all
        duration-300
        p-6
        border
        border-gray-100
        hover:-translate-y-1
      "
    >
      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500 text-sm font-semibold">
            {title}
          </p>

          <h2 className="text-4xl font-black mt-3 text-gray-900">
            {value}
          </h2>

        </div>

        <div
          className={`
            w-14
            h-14
            rounded-xl
            flex
            items-center
            justify-center
            ${color}
          `}
        >
          {icon}
        </div>

      </div>
    </div>
  );
};

export default DashboardCard;
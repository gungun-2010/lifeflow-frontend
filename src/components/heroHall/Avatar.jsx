import React from "react";

const colors = [
  "from-red-500 to-red-700",
  "from-blue-500 to-blue-700",
  "from-green-500 to-green-700",
  "from-purple-500 to-purple-700",
  "from-orange-500 to-orange-700",
  "from-pink-500 to-pink-700",
  "from-cyan-500 to-cyan-700",
  "from-indigo-500 to-indigo-700",
];

const Avatar = ({ name, size = "lg" }) => {

  const initials = name
    ?.split(" ")
    .map(word => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  // Generate a consistent color based on the user's name
  const index =
    name
      ?.split("")
      .reduce((sum, char) => sum + char.charCodeAt(0), 0) %
    colors.length;

  const gradient = colors[index];

  const sizes = {
    sm: "w-10 h-10 text-sm",
    md: "w-14 h-14 text-lg",
    lg: "w-16 h-16 text-xl",
    xl: "w-24 h-24 text-4xl",
  };

  return (
    <div
      className={`
        ${sizes[size]}
        rounded-full
        bg-gradient-to-br
        ${gradient}
        flex
        items-center
        justify-center
        text-white
        font-black
        shadow-lg
        select-none
      `}
    >
      {initials}
    </div>
  );
};

export default Avatar;
import React from "react";

const WelcomeBanner = () => {

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  return (

    <div
className="
  bg-gradient-to-r
  from-red-50
  to-rose-100
  rounded-3xl
  p-8
  shadow-md
  border
  border-red-100
"
    >

      <h1 className="text-4xl font-black text-red-700">

        {greeting}, Admin 👋

      </h1>

      <p className="mt-3 text-red-600 text-lg">

        Monitor hospitals, donors, blood requests,
        and platform activity from one place.

      </p>

    </div>

  );

};

export default WelcomeBanner;
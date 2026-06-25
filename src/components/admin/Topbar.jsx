import React from "react";

import {
  Search,
  Bell,
  UserCircle
} from "lucide-react";

const Topbar = () => {

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        p-5
        flex
        justify-between
        items-center
      "
    >

      <div className="relative w-96">

        <Search
          className="
            absolute
            left-4
            top-3.5
            text-gray-400
          "
        />

        <input
          placeholder="Search..."
          className="
            w-full
            pl-12
            pr-4
            py-3
            rounded-xl
            border
            border-gray-200
            focus:outline-none
          "
        />

      </div>

      <div className="flex items-center gap-5">

        <Bell
          className="text-gray-500"
          size={24}
        />

        <UserCircle
          className="text-gray-600"
          size={34}
        />

      </div>

    </div>

  );

};

export default Topbar;
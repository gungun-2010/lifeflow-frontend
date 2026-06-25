import React from "react";

import {
  Users,
  Building2,
  Activity,
  FileBarChart2
} from "lucide-react";

const actions = [

  {
    title: "Manage Users",
    icon: <Users size={26}/>
  },

  {
    title: "Hospitals",
    icon: <Building2 size={26}/>
  },

  {
    title: "Blood Requests",
    icon: <Activity size={26}/>
  },

  {
    title: "Reports",
    icon: <FileBarChart2 size={26}/>
  }

];

const QuickActions = () => {

  return (

    <div
      className="
        bg-white
        rounded-3xl
        p-6
        shadow-md
      "
    >

      <h2 className="text-2xl font-black mb-6">

        Quick Actions

      </h2>

      <div className="grid gap-4">

        {

          actions.map((action,index)=>(

            <button

              key={index}

              className="
                flex
                items-center
                gap-4
                bg-gray-100
                hover:bg-red-600
                hover:text-white
                transition-all
                rounded-2xl
                p-5
                font-bold
              "

            >

              {action.icon}

              {action.title}

            </button>

          ))

        }

      </div>

    </div>

  );

};

export default QuickActions;
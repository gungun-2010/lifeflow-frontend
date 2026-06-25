import React from "react";

const data = [

  {
    title:"New donor registered",
    time:"2 minutes ago"
  },

  {
    title:"Hospital created blood request",
    time:"10 minutes ago"
  },

  {
    title:"Donation completed",
    time:"18 minutes ago"
  },

  {
    title:"Inventory updated",
    time:"25 minutes ago"
  }

];

const RecentActivity = () => {

  return (

    <div
      className="
        bg-white
        rounded-3xl
        shadow-md
        p-6
      "
    >

      <h2 className="text-2xl font-black mb-6">

        Recent Activity

      </h2>

      {

        data.map((item,index)=>(

          <div
            key={index}
            className="
              py-4
              border-b
              last:border-none
            "
          >

            <h3 className="font-bold">

              {item.title}

            </h3>

            <p className="text-sm text-gray-500">

              {item.time}

            </p>

          </div>

        ))

      }

    </div>

  );

};

export default RecentActivity;
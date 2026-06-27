import { Building2 } from "lucide-react";

const HospitalHeader = () => {

  return (

    <div className="flex items-center justify-between">

      <div>

        <p className="uppercase tracking-[0.3em] text-red-600 font-black text-xs mb-3">

          Administration

        </p>

        <h1 className="text-5xl font-black text-gray-900">

          Hospital Management

        </h1>

        <p className="text-gray-500 mt-4 text-lg max-w-3xl">

          Manage every registered hospital, verify new registrations,
          monitor status and maintain the LifeFlow healthcare network.

        </p>

      </div>

      <div className="
        w-20
        h-20
        rounded-3xl
        bg-red-50
        flex
        items-center
        justify-center
      ">

        <Building2
          className="text-red-600"
          size={38}
        />

      </div>

    </div>

  );

};

export default HospitalHeader;
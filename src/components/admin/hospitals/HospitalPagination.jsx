import { ChevronLeft, ChevronRight } from "lucide-react";

const HospitalPagination = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl shadow-sm px-8 py-5 flex flex-col md:flex-row items-center justify-between">

      <p className="text-gray-500 text-sm">
        Showing <span className="font-bold text-gray-900">1–10</span> of{" "}
        <span className="font-bold text-gray-900">48</span> hospitals
      </p>

      <div className="flex items-center gap-2 mt-4 md:mt-0">

        <button
          className="
            w-10
            h-10
            rounded-xl
            border
            border-gray-200
            hover:bg-gray-50
            transition
          "
        >
          <ChevronLeft size={18} className="mx-auto" />
        </button>

        <button className="w-10 h-10 rounded-xl bg-red-600 text-white font-bold">
          1
        </button>

        <button className="w-10 h-10 rounded-xl hover:bg-gray-100 transition">
          2
        </button>

        <button className="w-10 h-10 rounded-xl hover:bg-gray-100 transition">
          3
        </button>

        <button
          className="
            w-10
            h-10
            rounded-xl
            border
            border-gray-200
            hover:bg-gray-50
            transition
          "
        >
          <ChevronRight size={18} className="mx-auto" />
        </button>

      </div>

    </div>
  );
};

export default HospitalPagination;
import { Search, Plus, Filter } from "lucide-react";

const HospitalToolbar = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        {/* Left Side */}

        <div className="flex flex-1 flex-col md:flex-row gap-4">

          {/* Search */}

          <div className="relative flex-1">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search hospitals..."
              className="
                w-full
                pl-12
                pr-4
                py-3
                rounded-2xl
                border
                border-gray-200
                bg-gray-50
                focus:bg-white
                focus:border-red-500
                outline-none
                transition-all
              "
            />

          </div>

          {/* Status */}

          <select
            className="
              px-5
              py-3
              rounded-2xl
              border
              border-gray-200
              bg-gray-50
              outline-none
              focus:border-red-500
            "
          >
            <option>All Status</option>
            <option>Verified</option>
            <option>Pending</option>
            <option>Blocked</option>
          </select>

          {/* City */}

          <select
            className="
              px-5
              py-3
              rounded-2xl
              border
              border-gray-200
              bg-gray-50
              outline-none
              focus:border-red-500
            "
          >
            <option>All Cities</option>
            <option>Mandi</option>
            <option>Delhi</option>
            <option>Mumbai</option>
          </select>

        </div>

        {/* Right Side */}

        <div className="flex items-center gap-3">

          <button
            className="
              flex
              items-center
              gap-2
              px-5
              py-3
              rounded-2xl
              border
              border-gray-200
              hover:bg-gray-50
              transition-all
            "
          >
            <Filter size={18} />
            More Filters
          </button>

          <button
            className="
              flex
              items-center
              gap-2
              px-6
              py-3
              rounded-2xl
              bg-red-600
              hover:bg-red-700
              text-white
              font-semibold
              shadow-sm
              transition-all
            "
          >
            <Plus size={18} />
            Add Hospital
          </button>

        </div>

      </div>

    </div>
  );
};

export default HospitalToolbar;
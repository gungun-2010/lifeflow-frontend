import React from 'react';
import { MapPin, Phone } from 'lucide-react';

const Centers = () => {
  const labs = [
    { name: "Zonal Hospital Blood Bank", loc: "Mandi, Himachal Pradesh", phone: "+91 1905 222111" },
    { name: "Red Cross Society", loc: "Near District Court, Mandi", phone: "+91 1905 223456" }
  ];

  return (
    <div className="w-full pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-black text-gray-900 mb-10">Nearest <span className="text-red-600">Centers</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {labs.map((center, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm group">
            <h3 className="text-lg font-black text-gray-900 mb-4">{center.name}</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                <MapPin size={16} className="text-red-500" /> {center.loc}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                <Phone size={16} className="text-green-500" /> {center.phone}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Centers;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, Info, Beaker } from 'lucide-react';

const BloodCompatibility = () => {
  const [selected, setSelected] = useState('O+');

  const data = {
    'O-': { give: ['All'], receive: ['O-'] },
    'O+': { give: ['O+', 'A+', 'B+', 'AB+'], receive: ['O+', 'O-'] },
    'A-': { give: ['A+', 'A-', 'AB+', 'AB-'], receive: ['A-', 'O-'] },
    'A+': { give: ['A+', 'AB+'], receive: ['A+', 'A-', 'O+', 'O-'] },
    'B-': { give: ['B+', 'B-', 'AB+', 'AB-'], receive: ['B-', 'O-'] },
    'B+': { give: ['B+', 'AB+'], receive: ['B+', 'B-', 'O+', 'O-'] },
    'AB-': { give: ['AB+', 'AB-'], receive: ['AB-', 'A-', 'B-', 'O-'] },
    'AB+': { give: ['AB+'], receive: ['All'] },
  };

  const types = Object.keys(data);

  return (
    <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-red-50 text-red-600 rounded-xl">
          <Beaker size={20} />
        </div>
        <div>
          <h3 className="text-lg font-black text-gray-900 leading-none">Compatibility Matrix</h3>
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">Interactive Guide</p>
        </div>
      </div>

      {/* Type Selector Grid */}
      <div className="grid grid-cols-4 gap-2 mb-8">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setSelected(type)}
            className={`py-3 rounded-2xl font-black text-sm transition-all active:scale-95 ${
              selected === type 
                ? 'bg-red-600 text-white shadow-lg shadow-red-200' 
                : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-4"
        >
          {/* Can Give To */}
          <div className="p-5 bg-emerald-50 rounded-[2rem] border border-emerald-100">
            <div className="flex items-center gap-2 text-emerald-700 mb-3">
              <ArrowUpRight size={16} strokeWidth={3} />
              <span className="text-[10px] font-black uppercase tracking-widest">Can Donate To</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {data[selected].give.map((t) => (
                <span key={t} className="px-4 py-1.5 bg-white text-emerald-700 rounded-xl text-xs font-black shadow-sm">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Can Receive From */}
          <div className="p-5 bg-blue-50 rounded-[2rem] border border-blue-100">
            <div className="flex items-center gap-2 text-blue-700 mb-3">
              <ArrowDownLeft size={16} strokeWidth={3} />
              <span className="text-[10px] font-black uppercase tracking-widest">Can Receive From</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {data[selected].receive.map((t) => (
                <span key={t} className="px-4 py-1.5 bg-white text-blue-700 rounded-xl text-xs font-black shadow-sm">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex items-start gap-2 p-4 bg-gray-50 rounded-2xl">
        <Info size={14} className="text-gray-400 mt-0.5 shrink-0" />
        <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
          {selected === 'O-' && "O- is the Universal Donor. Their blood can be given to anyone in emergencies."}
          {selected === 'AB+' && "AB+ is the Universal Recipient. They can receive blood from any group."}
          {selected !== 'O-' && selected !== 'AB+' && `People with ${selected} blood can safely help the groups listed above.`}
        </p>
      </div>
    </div>
  );
};

export default BloodCompatibility;
import React from 'react';
import { BookOpen, CheckCircle2, AlertCircle, Apple } from 'lucide-react';

const Learn = () => {
  const sections = [
    {
      title: "Preparation",
      icon: <Apple className="text-green-500" />,
      tips: ["Drink plenty of water", "Have a healthy meal", "Avoid alcohol 24h before"]
    },
    {
      title: "Benefits",
      icon: <CheckCircle2 className="text-red-500" />,
      tips: ["Free health check-up", "Reduces heart disease risk", "Stimulates cell production"]
    }
  ];

  return (
    <div className="w-full pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto animate-in slide-in-from-bottom-4 duration-700">
      <div className="mb-12">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Education <span className="text-red-600">Hub</span></h1>
        <p className="text-gray-500 text-sm font-medium mt-1">Everything you need to know about saving lives.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((sec, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gray-50 rounded-2xl">{sec.icon}</div>
              <h3 className="text-xl font-black text-gray-900">{sec.title}</h3>
            </div>
            <ul className="space-y-4">
              {sec.tips.map((tip, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-600 text-sm font-medium">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learn;
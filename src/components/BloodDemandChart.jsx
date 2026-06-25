import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import API from "../api/axios";

const BloodDemandChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await API.get('/requests/stats/demand');
        if (response.data.success) {
          // Recharts ko data { name: 'A+', value: 10 } format mein chahiye hota hai
          const formattedData = response.data.stats.map(item => ({
            name: item._id, // Blood Group
            units: item.totalUnits // Total Units demanded
          }));
          setData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  // Sundar dikhne ke liye different colors
  const COLORS = ['#ef4444', '#f87171', '#dc2626', '#b91c1c', '#991b1b'];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Blood Group Demand Analysis</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              cursor={{fill: '#fecaca'}} 
              contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="units" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-gray-500 mt-4 italic">
        * Total units required across all active hospital requests.
      </p>
    </div>
  );
};

export default BloodDemandChart;
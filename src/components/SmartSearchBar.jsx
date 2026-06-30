import React, { useState } from 'react';
import { Search, Sparkles, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SmartSearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [faqResult, setFaqResult] = useState('');
  const navigate = useNavigate(); // Hook initialized and ready

  const sampleChips = [
    "Urgent B+ needed at Zonal Hospital Mandi",
    "I want to donate O negative blood tomorrow",
    "Find blood banks near me",
    "Can I donate blood if I got a tattoo?"
  ];

  const handleSearch = async (textToSearch) => {
    const prompt = textToSearch || inputValue;
    if (!prompt.trim()) return;

    setLoading(true);
    setFaqResult('');

    try {
      const response = await fetch('http://localhost:3001/api/ai/smart-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: prompt })
      });
      
      const data = await response.json();
      console.log("AI Parsed Result:", data);

      // --- UPDATED ROUTING LOGIC ---
      switch (data.intent) {
        case 'REQUEST_BLOOD':{
          // Navigates directly to your find-donors page and appends search parameters to the URL
          const bg = encodeURIComponent(data.entities?.bloodGroup || '');
          const loc = encodeURIComponent(data.entities?.location || '');
          const urgent = encodeURIComponent(data.entities?.urgency || 'normal');
          navigate(`/find-donors?bg=${bg}&loc=${loc}&urgency=${urgent}`);
          break;
        }
        case 'OFFER_DONATION': {
          // Navigates directly to donor registration, passing the location if they provided one
          const preferredLoc = encodeURIComponent(data.entities?.location || '');
          navigate(`/register-as-donor?loc=${preferredLoc}`);
          break;
         }
        case 'FIND_CENTER': {
          // Navigates directly to centers page with the target location query
          const centerLoc = encodeURIComponent(data.entities?.location || '');
          navigate(`/centers?search=${centerLoc}`);
          break;
        }
        case 'GENERAL_FAQ':
          // Leaves this inline so the user can read the text without leaving the page!
          setFaqResult(data.faqResponse);
          break;

        default:
          alert("We couldn't quite process that. Try typing a location and blood group!");
      }
    } catch (error) {
      console.error("Search failed:", error);
      alert("Something went wrong connecting to LifeFlow. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 px-4">
      {/* Search Input Box */}
      <div className="relative flex items-center bg-white rounded-full shadow-lg border border-gray-200 p-2 focus-within:ring-2 focus-within:ring-red-500 transition-all">
        <Search className="text-gray-400 ml-4 w-5 h-5 flex-shrink-0" />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder='Ask LifeFlow (e.g., "Urgent B+ needed at Mandi")...'
          className="w-full pl-3 pr-4 py-3 text-gray-700 placeholder-gray-400 bg-transparent outline-none text-base"
        />
        <button
          onClick={() => handleSearch()}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-full flex items-center gap-2 transition-colors duration-200 shadow-md disabled:bg-gray-400"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          <span>{loading ? 'Analyzing...' : 'Search'}</span>
        </button>
      </div>

      {/* Recommended Suggestion Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
        <span className="text-xs text-gray-500 font-medium">Try asking:</span>
        {sampleChips.map((chip, index) => (
          <button
            key={index}
            onClick={() => {
              setInputValue(chip);
              handleSearch(chip);
            }}
            className="text-xs bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 border border-gray-200 hover:border-red-200 px-3 py-1.5 rounded-full transition-all duration-150"
          >
            "{chip}"
          </button>
        ))}
      </div>

      {/* Inline AI FAQ Response box */}
      {faqResult && (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-5 text-left shadow-sm animate-fade-in">
          <div className="flex items-center gap-2 text-red-700 font-bold text-sm mb-2">
            <Sparkles className="w-4 h-4" />
            <span>LifeFlow AI Medical Assistant</span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">{faqResult}</p>
        </div>
      )}
    </div>
  );
}
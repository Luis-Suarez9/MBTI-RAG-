"use client";

import React, { useState } from 'react';

export default function AccountButton() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="group flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:bg-white transition-all cursor-pointer focus:outline-none"
      >
        <div className="w-8 h-8 bg-[#829985] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-inner group-hover:bg-[#6b826e] transition-colors">
          J
        </div>
        <span className="text-gray-800 font-medium group-hover:text-[#6b826e] transition-colors">
          Jirakorn Chaitanaporn
        </span>
      </button>

      {isDropdownOpen && (
        <a href="/">
            <div className="absolute right-0 mt-2 w-full min-w-[140px] bg-white rounded-lg shadow-xl py-2 z-10 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
                <button 
                    onClick={() => {
                    console.log("Logging out...");
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 font-medium hover:bg-red-50 transition-colors cursor-pointer"
                >
                    Logout
                </button>
            </div>
        </a>
      )}
    </div>
  );
}
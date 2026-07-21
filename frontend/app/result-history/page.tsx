"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AccountButton from '../components/accountButton'; 
import Footer from '../components/footer'; 
import { isAuthenticated } from '@/app/libs/auth';

// Mock data matching the rows in image_3936c5.jpg
const mockHistory = [
  { id: 1, date: '15 Oct 2023', result: 'INFJ - The Advocate' },
  { id: 2, date: '03 Aug 2023', result: 'ENFP - The Campaigner' },
  { id: 3, date: '21 May 2023', result: 'ISTP - The Virtuoso' },
  { id: 4, date: '09 Mar 2023', result: 'ISFP - The Adventurer' },
  { id: 5, date: '09 Mar 2023', result: 'ISFP - The Adventurer' },
  { id: 6, date: '09 Mar 2023', result: 'ISFP - The Adventurer' },
  { id: 7, date: '09 Mar 2023', result: 'ISFP - The Adventurer' },
  { id: 8, date: '09 Mar 2023', result: 'ISFP - The Adventurer' },
  { id: 9, date: '09 Mar 2023', result: 'ISFP - The Adventurer' },
];

export default function ResultHistoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔐 ROUTE PROTECTION: If not authenticated, bounce back to login page
    if (!isAuthenticated()) {
      router.replace('/auth/google?redirect=/result-history');
    } else {
      setLoading(false);
    }
  }, [router]);

  // Show a clean loading state to prevent unauthorized layout flash
  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center bg-gray-100"
        style={{
          backgroundImage: "url('/normalBackground.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-xl flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#829985]/20 border-t-[#829985] rounded-full animate-spin" />
          <p className="text-sm font-medium text-gray-600">Verifying session...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col font-sans relative bg-gray-100"
      style={{
        backgroundImage: "url('/normalBackground.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Top Navigation / Account Section */}
      <header className="w-full p-6 flex justify-end items-center">
        <AccountButton />
      </header>

      {/* Main Centered Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        {/* The Central White Card */}
        <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-10 mt-[-5vh]">
          <h1 className="text-4xl font-serif text-center mb-8 text-black tracking-wide">
            YOUR MBTI TEST HISTORY
          </h1>

          <div className="overflow-x-auto">
            <div className="max-h-[22rem] overflow-y-auto">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 z-10 bg-white">
                  <tr className="border-b border-gray-300">
                    <th className="py-4 text-sm font-semibold text-gray-700 tracking-wider">
                      DATE COMPLETE
                    </th>
                    <th className="py-4 text-sm font-semibold text-gray-700 tracking-wider">
                      MBTI RESULT
                    </th>
                    <th className="py-4 text-sm font-semibold text-gray-700 tracking-wider">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockHistory.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100 last:border-0">
                      <td className="py-5 text-gray-800 font-medium">{item.date}</td>
                      <td className="py-5 text-gray-800 font-medium">{item.result}</td>
                      <td className="py-5">
                        <a href="/test-detail" className="bg-[#829985] text-white px-5 py-2 rounded text-sm font-medium shadow-sm hover:bg-[#6b826e] transition-colors">
                          VIEW DETAIL
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
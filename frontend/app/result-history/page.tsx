import React from 'react';
import Link from 'next/link';
// Adjust the import path below depending on where you save accountbutton.tsx
import AccountButton from '../components/accountButton'; 
import Footer from '../components/footer'; 

// Mock data matching the rows in image_3936c5.jpg
const mockHistory = [
  { id: 1, date: '15 Oct 2023', result: 'INFJ - The Advocate' },
  { id: 2, date: '03 Aug 2023', result: 'ENFP - The Campaigner' },
  { id: 3, date: '21 May 2023', result: 'ISTP - The Virtuoso' },
  { id: 4, date: '09 Mar 2023', result: 'ISFP - The Adventurer' },
];

export default function ResultHistoryPage() {
  return (
    <div
      className="min-h-screen flex flex-col font-sans relative bg-gray-100"
      style={{
        // References the image exactly as requested
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
            <table className="w-full text-left border-collapse">
              <thead>
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
      </main>
      <Footer />
    </div>
  );
}
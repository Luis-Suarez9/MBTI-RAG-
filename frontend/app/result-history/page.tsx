"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AccountButton from '../components/accountButton';
import Footer from '../components/footer';
import { isAuthenticated, getUser } from '@/app/libs/auth';
import { IndividualMBTI } from '@/types/IndividualMBTI';
// 🌐 Global API URL from environment variable
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5175';



export default function ResultHistoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [historyData, setHistoryData] = useState<IndividualMBTI[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 🔐 ROUTE PROTECTION: If not authenticated, bounce back to login page
    if (!isAuthenticated()) {
      router.replace('/auth/google?redirect=/result-history');
      return;
    }

    const user = getUser();
    if (!user || !user.id) {
      router.replace('/auth/google?redirect=/result-history');
      return;
    }

    const fetchHistory = async () => {
      try {
        const res = await fetch(`${API_URL}/api/individualMbtiRoutes/user/${user.id}`);
        if (!res.ok) {
          if (res.status === 404) {
            setHistoryData([]);
          } else {
            throw new Error(`Failed to fetch history: ${res.statusText}`);
          }
        } else {
          const data = await res.json();
          setHistoryData(data);
        }
      } catch (err: any) {
        console.error("Error fetching history:", err);
        setError(err.message || 'Error fetching history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [router]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

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
          <p className="text-sm font-medium text-gray-600">Loading history...</p>
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

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center text-sm">
              {error}
            </div>
          )}

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
                  {historyData.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-gray-500 font-medium">
                        No test history found. Take a test to see your results!
                      </td>
                    </tr>
                  ) : (
                    historyData.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100 last:border-0">
                        <td className="py-5 text-gray-800 font-medium">
                          {formatDate(item.createdAt)}
                        </td>
                        <td className="py-5 text-gray-800 font-medium">
                          {item.name}{item.nickname ? ` - ${item.nickname}` : ''}
                        </td>
                        <td className="py-5">
                          <a
                            href={`/test-detail/${item.id}`}
                            className="bg-[#829985] text-white px-5 py-2 rounded text-sm font-medium shadow-sm hover:bg-[#6b826e] transition-colors inline-block"
                          >
                            VIEW DETAIL
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href="/"
              className="bg-[#829985] text-white px-6 py-2 rounded shadow-sm hover:bg-[#6b826e] transition-colors font-medium"
            >
              BACK TO HOME
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

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
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const confirmDelete = async () => {
    if (deleteId === null) return;
    const id = deleteId;
    setDeleteId(null);
    try {
      const res = await fetch(`${API_URL}/api/individualMbtiRoutes/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        const msg = errBody?.error || errBody?.message || `Delete failed: ${res.status}`;
        throw new Error(msg);
      }
      // Remove deleted item from state
      setHistoryData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error deleting record';
      console.error('Delete error:', err);
      setError(message);
    }
  };

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
        const res = await fetch(`${API_URL}/api/individualMbtiRoutes/user/${user.id}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
          },
        });

        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            sessionStorage.removeItem('mbti_user');
            localStorage.removeItem('mbti_user');
            router.replace('/auth/google?redirect=/result-history');
            return;
          }

          if (res.status === 404) {
            setHistoryData([]);
            return;
          }

          let errorMessage = `Failed to fetch history: ${res.status}`;
          try {
            const errBody = await res.json();
            errorMessage = errBody?.error || errBody?.message || errorMessage;
          } catch {
            // ignore JSON parse errors and fall back to the status-based message
          }

          throw new Error(errorMessage);
        }

        const data = await res.json();
        setHistoryData(Array.isArray(data) ? data : []);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error fetching history';
        console.error('Error fetching history:', err);
        setError(message);
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
                          <div className="flex items-center gap-2">
                            <a
                              href={`/test-detail/${item.id}`}
                              className="bg-[#829985] text-white px-5 py-2 rounded text-sm font-medium shadow-sm hover:bg-[#6b826e] transition-colors inline-block"
                            >
                              VIEW DETAIL
                            </a>
                            <button
                              onClick={() => setDeleteId(item.id)}
                              className="text-red-500 hover:text-red-700 text-xl cursor-pointer p-1 transition-colors flex items-center justify-center"
                              title="Delete record"
                              aria-label="Delete"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 fill-current"
                                viewBox="0 0 24 24"
                              >
                                <path d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z" />
                              </svg>
                            </button>
                          </div>
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

      {/* 🛑 Confirmation Modal Card in middle of screen */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm text-center transform transition-all animate-in fade-in zoom-in duration-150">
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                <path d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Record</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this test result? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-lg transition-colors cursor-pointer"
              >
                No, Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg shadow transition-colors cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

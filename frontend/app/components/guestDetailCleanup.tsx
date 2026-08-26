"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5175';

interface GuestDetailCleanupProps {
  id: number;
}

export default function GuestDetailCleanup({ id }: GuestDetailCleanupProps) {
  const router = useRouter();

  useEffect(() => {
    const cleanupRecord = () => {
      // Fire-and-forget DELETE request with keepalive on page close / unload
      try {
        fetch(`${API_URL}/api/individualMbtiRoutes/${id}`, {
          method: 'DELETE',
          keepalive: true,
          credentials: 'include',
        });
      } catch (err) {
        console.error('Failed to cleanup guest record:', err);
      }
    };

    window.addEventListener('pagehide', cleanupRecord);
    window.addEventListener('beforeunload', cleanupRecord);

    return () => {
      window.removeEventListener('pagehide', cleanupRecord);
      window.removeEventListener('beforeunload', cleanupRecord);
    };
  }, [id]);

  const handleBackToHome = async () => {
    try {
      await fetch(`${API_URL}/api/individualMbtiRoutes/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
    } catch (err) {
      console.error('Error deleting guest record on back to home:', err);
    } finally {
      router.push('/');
    }
  };

  return (
    <button
      onClick={handleBackToHome}
      className="bg-[#829985] text-white px-6 py-2 rounded shadow-sm hover:bg-[#6b826e] transition-colors font-medium cursor-pointer"
    >
      BACK TO HOME
    </button>
  );
}

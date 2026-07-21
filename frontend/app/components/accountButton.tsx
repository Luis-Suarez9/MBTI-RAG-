"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { googleLogout } from "@react-oauth/google";
import { getUser, logout, isAuthenticated, type AuthUser } from "@/app/libs/auth";

export default function AuthHeaderControl() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Read stored session on mount (client-only)
  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getUser());
    }
    setMounted(true);
  }, []);

  const handleGoToLogin = () => {
    const currentPath = typeof window !== 'undefined' ? window.location.pathname + window.location.search : "/";
    router.push(`/auth/google?redirect=${encodeURIComponent(currentPath)}`);
  };

  if (!mounted) {
    // Prevent hydration flicker by rendering a matching blank space while reading localStorage
    return <div className="absolute top-6 right-6 h-10 w-[170px]" />;
  }

  const handleLogout = () => {
    try {
      googleLogout(); // Clear any Google-side session state/cache in browser memory
    } catch (e) {
      console.warn("Google logout warning:", e);
    }
    logout(); // Clear JWT token and user profile from localStorage
    setUser(null);
    setIsDropdownOpen(false);
    router.refresh();
  };

  const avatarInitial = user?.username?.[0]?.toUpperCase() ?? "?";

  return (
    <div className="absolute top-6 right-6 flex items-center gap-4">
      {!user ? (
        /* --- LOGGED OUT STATE --- */
        <>
          <button
            id="login-btn"
            onClick={handleGoToLogin}
            className="bg-[#839b88] hover:bg-[#728877] text-white px-6 py-2 rounded-md font-medium shadow transition-colors cursor-pointer"
          >
            Login / Signup
          </button>
          <button
            id="google-login-btn"
            onClick={handleGoToLogin}
            className="bg-white hover:bg-gray-50 text-gray-700 p-2 rounded-md shadow flex items-center justify-center font-bold text-lg w-10 h-10 transition-colors cursor-pointer"
            aria-label="Login with Google"
          >
            <span className="text-[#DB4437]">G</span>
          </button>
        </>
      ) : (
        /* --- LOGGED IN STATE --- */
        <div className="relative">
          <button
            id="user-menu-btn"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="group flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:bg-white transition-all cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 bg-[#829985] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-inner group-hover:bg-[#6b826e] transition-colors">
              {avatarInitial}
            </div>
            <span className="text-gray-800 font-medium group-hover:text-[#6b826e] transition-colors">
              {user.username.split(" ")[0].split("_")[0]}
            </span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-full min-w-[160px] bg-white rounded-lg shadow-xl py-2 z-10 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
              <p className="px-4 py-1 text-xs text-gray-400 truncate">{user.email}</p>
              <div className="my-1 border-t border-gray-100" />
              <button
                id="logout-btn"
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 font-medium hover:bg-red-50 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
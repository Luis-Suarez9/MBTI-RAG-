"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { loginWithGoogle, isAuthenticated } from "@/app/libs/auth";

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;

export default function GoogleAuthPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      const params = new URLSearchParams(window.location.search);
      const redirectTo = params.get("redirect") || "/";
      router.replace(redirectTo);
    }
  }, [router]);

  const handleSuccess = async (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;
    if (!idToken) {
      setError("No credential received from Google.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await loginWithGoogle(idToken);
      const params = new URLSearchParams(window.location.search);
      const redirectTo = params.get("redirect") || "/";
      router.replace(redirectTo);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Authentication failed";
      setError(message);
      setLoading(false);
    }
  };

  const handleError = () => {
    setError("Google sign-in was cancelled or failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div 
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative px-4"
        style={{ 
          backgroundImage: "url('/normalBackground.png')",
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Soft overlay to make the card pop and improve readability */}
        <div className="absolute inset-0 bg-black/15 backdrop-blur-[2px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-[420px] transform hover:scale-[1.01] transition-transform duration-500 ease-out">
          {/* Main Card with Glassmorphism and Sage Border */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-10 flex flex-col items-center gap-8 relative overflow-hidden">
            
            {/* Subtle light reflect line on top */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />

            {/* Header / Brand Identity */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-5xl font-serif tracking-widest text-[#1e231f] select-none font-bold">
                MBTI
              </span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#839b88]" />
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6e8573]">
                  Personality Test
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#839b88]" />
              </div>
            </div>

            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#839b88]/30 to-transparent" />

            <div className="text-center space-y-2">
              <h1 className="text-2xl font-serif font-bold text-gray-800 tracking-wide">
                Welcome Back
              </h1>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[280px] mx-auto">
                Sign in to view your cognitive profile and full test results history.
              </p>
            </div>

            {/* Google Authentication Section */}
            <div className="w-full flex flex-col items-center gap-4">
              {loading ? (
                <div className="flex flex-col items-center justify-center gap-3 py-6">
                  <div className="relative w-10 h-10">
                    <div className="absolute inset-0 rounded-full border-4 border-[#839b88]/20" />
                    <div className="absolute inset-0 rounded-full border-4 border-t-[#839b88] animate-spin" />
                  </div>
                  <span className="text-sm font-medium text-gray-600 animate-pulse">
                    Authenticating securely...
                  </span>
                </div>
              ) : (
                <div className="w-full flex justify-center py-2 px-1 hover:shadow-lg rounded-lg transition-shadow duration-300">
                  <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleError}
                    useOneTap={false}
                    theme="outline"
                    size="large"
                    width="320"
                    text="signin_with"
                    shape="pill"
                  />
                </div>
              )}

              {error && (
                <div className="text-xs text-red-600 text-center bg-red-50/90 border border-red-200/50 rounded-xl px-4 py-3 w-full animate-shake">
                  {error}
                </div>
              )}
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {/* Back button */}
            <button
              onClick={() => router.back()}
              className="group flex items-center gap-2 text-sm text-gray-500 hover:text-[#6e8573] font-medium transition-colors cursor-pointer"
            >
              <svg 
                className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return to Home
            </button>
          </div>

          {/* Footer inside card layout */}
          <div className="text-center text-xs text-gray-500 mt-6 select-none">
            By signing in, you agree to our{" "}
            <span className="underline hover:text-[#6e8573] cursor-pointer transition-colors">Terms of Service</span>
            {" "}and{" "}
            <span className="underline hover:text-[#6e8573] cursor-pointer transition-colors">Privacy Policy</span>.
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

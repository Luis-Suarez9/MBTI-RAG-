import React from 'react';
import AccountButton from '../../components/accountButton';
import Footer from '../../components/footer';
import { mbtiProfiles } from '../../libs/mockMBTI';

const strengthColors = [
  'bg-green-50/70 border-green-200',
  'bg-yellow-50/70 border-yellow-200',
  'bg-pink-50/70 border-pink-200',
  'bg-purple-50/70 border-purple-200',
];

export default async function MbtiExplainPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  const profile = mbtiProfiles.find((p) => p.id === id);

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-4">
        <p className="text-lg text-gray-700 font-semibold">Profile not found.</p>
        <a href="/" className="bg-[#829985] text-white px-6 py-2 rounded shadow-sm hover:bg-[#6b826e] transition-colors font-medium">
          BACK TO HOME
        </a>
      </div>
    );
  }

  const strengthEntries = Object.entries(profile.coreStrengths);

  return (
    <div
      className="min-h-screen flex flex-col font-sans relative bg-gray-100"
      style={{
        backgroundImage: "url('/normalBackground.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Top Header / Account Button */}
      <header className="w-full p-6 flex justify-end items-center sticky top-0 z-20">
        <AccountButton />
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 pb-12">
        {/* The Central White Card */}
        <div className="bg-[#f8f9f7]/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-5xl p-8 md:p-12 border border-white/50">

          {/* Header Section */}
          <div className="text-center mb-8 border-b border-gray-200 pb-6">
            <h1 className="text-4xl md:text-5xl font-serif text-[#4a4238] tracking-widest flex items-center justify-center gap-4 mb-2">
              {profile.type}
              <span className="text-3xl">✨</span>
            </h1>

            <p className="text-lg text-gray-700 font-medium font-serif italic">
              (Nicknamed: {profile.title})
            </p>

            <p className="text-sm text-gray-600 max-w-3xl mx-auto mt-4 leading-relaxed">
              {profile.description}
            </p>
          </div>

          {/* Section 1: Who They Are */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#4a4238] flex items-center gap-2 mb-3">
              <span>🌈</span> {profile.title} Who are they
            </h2>
            <p className="text-gray-800 text-sm leading-relaxed">
              {profile.whoAreThey}
            </p>
          </div>

          {/* Section 2: Methodology */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#4a4238] flex items-center gap-2 mb-3">
              <span>🗝️</span> A DEEPER INSIGHT INTO THEIR METHODOLOGY <span>🗝️</span>
            </h2>
            <p className="text-gray-800 text-sm leading-relaxed">
              {profile.methodology}
            </p>
          </div>

          {/* Section 3: Core Strengths */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#4a4238] flex items-center gap-2 mb-4">
              <span>💡</span> CORE STRENGTHS: THE POWER OF POSSIBILITY
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {strengthEntries.map(([key, value], i) => (
                <div
                  key={key}
                  className={`border rounded-xl p-4 ${strengthColors[i % strengthColors.length]}`}
                >
                  <h3 className="font-bold text-[#4a4238] mb-1">{key}</h3>
                  <p className="text-gray-800 text-sm">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Compatibility */}
          <div>
            <h2 className="text-xl font-bold text-[#4a4238] text-center mb-6 border-t border-gray-200 pt-6">
              <span className="mr-2">🤝</span> COMPATIBILITY: SYNERGY &amp; CHALLENGES <span className="ml-2">🚫</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="pr-0 md:pr-6 md:border-r border-gray-300">
                <h3 className="text-md font-bold text-[#4a4238] text-center mb-4">🤝 SYNERGISTIC PARTNERS</h3>
                <p className="text-gray-800 text-sm leading-relaxed">
                  {profile.compatibility.synergy}
                </p>
              </div>
              <div className="pl-0 md:pl-2">
                <h3 className="text-md font-bold text-[#4a4238] text-center mb-4">🚫 CHALLENGES</h3>
                <p className="text-gray-800 text-sm leading-relaxed">
                  {profile.compatibility.challenges}
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Growth */}
          <div className="mt-10 border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-[#4a4238] flex items-center gap-2 mb-3">
              <span>🌱</span> THE {profile.type.toUpperCase()} GROWTH JOURNEY
            </h2>
            <p className="text-gray-800 text-sm leading-relaxed">
              {profile.growthJourney}
            </p>
          </div>

          {/* Final Quote */}
          <div className="mt-8 text-center border-t border-gray-200 pt-6 mb-8">
            <p className="text-lg font-serif italic text-[#4a4238] leading-relaxed">
              {profile.quote}
            </p>
          </div>

        </div>

        <div className="flex justify-between items-center mt-10 mb-4">
          <a href="/">
            <button className="bg-[#829985] text-white px-6 py-2 rounded shadow-sm hover:bg-[#6b826e] transition-colors font-medium cursor-pointer">
              BACK TO HOME
            </button>
          </a>
        </div>
      </main>

      {/* Shared Footer Component */}
      <Footer />
    </div>
  );
}
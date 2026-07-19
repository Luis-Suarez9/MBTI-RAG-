import React from 'react';
import AccountButton from '../components/accountButton';
import Footer from '../components/footer';

export default function MbtiExplainPage() {
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
              <span className="text-3xl">🌈</span>
              THE ENFP
              <span className="text-3xl">✨</span>
            </h1>

            <p className="text-lg text-gray-700 font-medium font-serif italic">
              (Nicknamed: 'THE CAMPAIGNER' / 'THE INSPIRER')
            </p>

            <p className="text-sm text-gray-600 max-w-3xl mx-auto mt-4 leading-relaxed">
              A curious, energetic, and deeply imaginative personality driven by the
              desire to explore possibilities, connect with people, and transform
              meaningful ideas into something alive.
            </p>
          </div>

          {/* Section 1: Who They Are */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#4a4238] flex items-center gap-2 mb-3">
              <span>🌈</span> THE POSSIBILITY SEEKER: WHO THEY ARE
            </h2>
            <p className="text-gray-800 text-sm leading-relaxed">
              ENFPs are enthusiastic explorers who look beyond the status quo to imagine what could be. 
              They are masters of connection, bridging unrelated ideas and making others feel seen 
              and valued. Driven by curiosity, they don't just ask "What is this?" but constantly 
              seek to discover "What could this become?" through a lens of creative possibility.
            </p>
          </div>

          {/* Section 2: Methodology */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#4a4238] flex items-center gap-2 mb-3">
              <span>🗝️</span> A DEEPER INSIGHT INTO THEIR METHODOLOGY <span>🗝️</span>
            </h2>
            <p className="text-gray-800 text-sm leading-relaxed">
              Their approach is rooted in personal values, authenticity, and open-ended exploration. 
              Rather than sticking to rigid systems, they thrive when given the freedom to experiment 
              and pivot. By focusing on projects that feel meaningful, they channel their natural 
              enthusiasm and emotional intelligence to transform abstract visions into impactful reality.
            </p>
          </div>

          {/* Section 3: Core Strengths */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#4a4238] flex items-center gap-2 mb-4">
              <span>💡</span> CORE STRENGTHS: THE POWER OF POSSIBILITY
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50/70 border border-green-200 rounded-xl p-4">
                <h3 className="font-bold text-[#4a4238] mb-1">🌱 Inspiring Potential</h3>
                <p className="text-gray-800 text-sm">They instinctively spot hidden talents and possibilities in others.</p>
              </div>
              <div className="bg-yellow-50/70 border border-yellow-200 rounded-xl p-4">
                <h3 className="font-bold text-[#4a4238] mb-1">✨ Creative Exploration</h3>
                <p className="text-gray-800 text-sm">Their minds constantly generate fresh ideas and unique perspectives.</p>
              </div>
              <div className="bg-pink-50/70 border border-pink-200 rounded-xl p-4">
                <h3 className="font-bold text-[#4a4238] mb-1">🤝 Emotional Connection</h3>
                <p className="text-gray-800 text-sm">They prioritize genuine, authentic relationships and deep empathy.</p>
              </div>
              <div className="bg-purple-50/70 border border-purple-200 rounded-xl p-4">
                <h3 className="font-bold text-[#4a4238] mb-1">🔥 Passionate Energy</h3>
                <p className="text-gray-800 text-sm">Their contagious enthusiasm effectively motivates and energizes those around them.</p>
              </div>
            </div>
          </div>

          {/* Section 4: Compatibility */}
          <div>
            <h2 className="text-xl font-bold text-[#4a4238] text-center mb-6 border-t border-gray-200 pt-6">
              <span className="mr-2">🤝</span> COMPATIBILITY: SYNERGY & CHALLENGES <span className="ml-2">🚫</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="pr-0 md:pr-6 md:border-r border-gray-300">
                <h3 className="text-md font-bold text-[#4a4238] text-center mb-4">🤝 SYNERGISTIC PARTNERS</h3>
                <p className="text-gray-800 text-sm leading-relaxed">
                  ENFPs pair well with <strong>INTJs, INTPs, and INFJs</strong>. These types provide 
                  the strategic structure and conceptual depth that help the ENFP ground their 
                  creative, abstract visions, creating a balance between imaginative exploration 
                  and actionable, long-term direction.
                </p>
              </div>
              <div className="pl-0 md:pl-2">
                <h3 className="text-md font-bold text-[#4a4238] text-center mb-4">🚫 CHALLENGES</h3>
                <p className="text-gray-800 text-sm leading-relaxed">
                  They may clash with <strong>ISTJs, ESTJs, and ISTPs</strong>, who often favor 
                  strict routines and rigid efficiency. Conflict arises when the ENFP’s need for 
                  spontaneity and emotional meaning meets a partner’s focus on proven methods 
                  and immediate, literal tasks.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Growth */}
          <div className="mt-10 border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-[#4a4238] flex items-center gap-2 mb-3">
              <span>🌱</span> THE ENFP GROWTH JOURNEY
            </h2>
            <p className="text-gray-800 text-sm leading-relaxed">
              The ENFP’s growth journey centers on learning that commitment does not restrict 
              freedom, but rather enables impact. By balancing their boundless imagination with 
              discipline and patience, they transform from people who simply dream of change 
              into powerful leaders who turn those possibilities into meaningful, lasting realities.
            </p>
          </div>

          {/* Final Quote */}
          <div className="mt-8 text-center border-t border-gray-200 pt-6 mb-8">
            <p className="text-lg font-serif italic text-[#4a4238] leading-relaxed">
              “The world is full of possibilities waiting to be discovered. 
              The ENFP's greatest gift is helping people see the possibilities they had forgotten were there.”
            </p>
            <p className="text-sm font-bold text-gray-600 mt-3 tracking-widest">— THE CAMPAIGNER</p>
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
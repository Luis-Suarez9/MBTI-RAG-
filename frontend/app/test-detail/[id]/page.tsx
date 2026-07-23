import React from 'react';
import AccountButton from '../../components/accountButton';
import Footer from '../../components/footer';
import { Trait } from '@/types/Trait';
import { IndividualMBTI } from '@/types/IndividualMBTI';

// This is a Server Component, so it must use the backend address that is
// reachable from the Next.js server/container. `localhost` would otherwise
// point back to the frontend container.
const API_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5175';

export default async function TestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = Number(idStr);

  let mbtiRecord: IndividualMBTI | null = null;
  try {
    const res = await fetch(`${API_URL}/api/individualMbtiRoutes/${id}`, { cache: 'no-store' });
    if (res.ok) {
      mbtiRecord = await res.json();
    }
  } catch (error) {
    console.error(`Error fetching MBTI record from API (URL: ${API_URL}/api/individualMbtiRoutes/${id}):`, error);
  }

  if (!mbtiRecord) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-4">
        <p className="text-lg text-gray-700 font-semibold">MBTI Record not found.</p>
        <a href="/result-history" className="bg-[#829985] text-white px-6 py-2 rounded shadow-sm hover:bg-[#6b826e] transition-colors font-medium">
          BACK TO HISTORY
        </a>
      </div>
    );
  }

  // Build the dynamic traits data using the database percentages
  const traitsData: Trait[] = [
    {
      id: 1,
      label1: 'MIND: E (Extraverted)',
      val1: mbtiRecord.eiPercent,
      label2: 'I (Introverted)',
      val2: 100 - mbtiRecord.eiPercent,
      color1: 'bg-[#a37b5b]',
      color2: 'bg-[#5b7361]'
    },
    {
      id: 2,
      label1: 'ENERGY: S (Observant)',
      val1: mbtiRecord.snPercent,
      label2: 'N (Intuitive)',
      val2: 100 - mbtiRecord.snPercent,
      color1: 'bg-[#a37b5b]',
      color2: 'bg-[#5b7361]'
    },
    {
      id: 3,
      label1: 'NATURE: T (Thinking)',
      val1: mbtiRecord.tfPercent,
      label2: 'F (Feeling)',
      val2: 100 - mbtiRecord.tfPercent,
      color1: 'bg-[#a37b5b]',
      color2: 'bg-[#5b7361]'
    },
    {
      id: 4,
      label1: 'TACTICS: J (Judging)',
      val1: mbtiRecord.jpPercent,
      label2: 'P (Prospecting)',
      val2: 100 - mbtiRecord.jpPercent,
      color1: 'bg-[#a37b5b]',
      color2: 'bg-[#5b7361]'
    },
  ];

  const typeName = mbtiRecord.name.toUpperCase();
  const nicknameText = mbtiRecord.nickname ? ` - ${mbtiRecord.nickname.toUpperCase()}` : '';

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f2f4f1]">
      {/* Upper Section with Background Image */}
      <div
        className="relative w-full min-h-[60vh] h-auto pb-12 flex flex-col"
        style={{
          backgroundImage: "url('/home_background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Top Header / Account Button */}
        <header className="w-full p-6 flex justify-end items-center z-10">
          <AccountButton />
        </header>

        {/* Title and Main Result Card */}
        <div className="flex-grow flex flex-col items-center pt-8 md:pt-12 px-4">
          <h1 className="text-3xl md:text-5xl font-serif text-black tracking-wide mb-10 text-center shadow-sm">
            YOUR MBTI TEST RESULTS
          </h1>

          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-5 md:p-8">
            <h2 className="text-xl md:text-2xl font-serif text-center mb-8 text-black">
              YOUR TYPE: {typeName}{nicknameText}
            </h2>

            {/* Trait Progress Bars */}
            <div className="flex flex-col gap-6 md:gap-5 w-full">
              {traitsData.map((trait) => (
                <div key={trait.id} className="w-full flex flex-col md:flex-row items-center justify-center text-sm font-medium text-gray-800">

                  {/* Mobile Labels */}
                  <div className="flex md:hidden justify-between w-full text-xs mb-2 text-gray-700">
                    <span className="text-left flex-1 pr-2">{trait.label1} <br /> <span className="text-gray-500 font-normal">[{trait.val1}%]</span></span>
                    <span className="text-right flex-1 pl-2">{trait.label2} <br /> <span className="text-gray-500 font-normal">[{trait.val2}%]</span></span>
                  </div>

                  {/* Desktop Left Label */}
                  <div className="hidden md:block w-2/5 text-right pr-4">
                    {trait.label1} <span className="text-gray-500 font-normal ml-1">[{trait.val1}%]</span>
                  </div>

                  {/* Progress Bars Container */}
                  <div className="w-full md:w-1/5 flex items-center justify-center">
                    {/* Left Progress Bar */}
                    <div className="w-1/2 h-[10px] bg-gray-200 relative flex justify-end rounded-l-sm overflow-hidden">
                      <div className={`h-full ${trait.color1}`} style={{ width: `${trait.val1}%` }}></div>
                    </div>

                    {/* VS Divider */}
                    <div className="text-center w-10 md:w-12 text-gray-400 font-normal text-xs md:text-sm">-vs-</div>

                    {/* Right Progress Bar */}
                    <div className="w-1/2 h-[10px] bg-gray-200 relative flex justify-start rounded-r-sm overflow-hidden">
                      <div className={`h-full ${trait.color2}`} style={{ width: `${trait.val2}%` }}></div>
                    </div>
                  </div>

                  {/* Desktop Right Label */}
                  <div className="hidden md:block w-2/5 text-left pl-4">
                    <span className="text-gray-500 font-normal mr-1">[{trait.val2}%]</span> {trait.label2}
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lower Section: Explanation Cards */}
      <div className="flex-grow w-full max-w-5xl mx-auto px-6 pt-12 pb-6 flex flex-col">
        <div className="grid md:grid-cols-2 gap-6 mb-auto">
          {/* Core Trait Card */}
          <div className="bg-[#f3f2ed] p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-3 tracking-wide">CORE TRAIT EXPLANATION</h3>
            <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
              {mbtiRecord.coreExplain || 'No core trait explanation available.'}
            </p>
          </div>

          {/* AI Analysis Card */}
          <div className="bg-[#f3f2ed] p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-3 tracking-wide">
              AI-DRIVEN BEHAVIORAL ANALYSIS & USER DESCRIPTION
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">
              {mbtiRecord.aiDescription || 'No AI-driven behavioral analysis available.'}
            </p>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="flex justify-between items-center mt-10 mb-4">
          <a href="/result-history">
            <button className="bg-[#829985] text-white px-6 py-2 rounded shadow-sm hover:bg-[#6b826e] transition-colors font-medium cursor-pointer">
              BACK TO HISTORY
            </button>
          </a>
        </div>
      </div>

      {/* Reusable Footer Component */}
      <Footer />
    </div>
  );
}

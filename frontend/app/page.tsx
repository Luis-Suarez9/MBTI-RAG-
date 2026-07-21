"use client";

import { useState, useEffect } from "react";
import Footer from "./components/footer";
import AuthHeaderControl from "./components/accountButton";
// Import the mock data schema
import { mbtiProfiles } from "./libs/mockMBTI";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width >= 1440) return 4;
      if (width >= 1024) return 3;
      if (width >= 768) return 2;
      return 1;
    }
    return 4; // default for SSR (largest breakpoint)
  });

  const handleNext = () => {
    if (currentIndex + cardsToShow < mbtiProfiles.length) {
      setCurrentIndex((prev) => prev + cardsToShow);
    } else {
      setCurrentIndex(0); // Wrap around to the start on manual click if at the end
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - cardsToShow);
    } else {
      // Go to the last possible page
      const remainder = mbtiProfiles.length % cardsToShow;
      const lastIndex = remainder === 0
        ? mbtiProfiles.length - cardsToShow
        : mbtiProfiles.length - remainder;
      setCurrentIndex(lastIndex);
    }
  };

  // Update cardsToShow on window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w >= 1440) setCardsToShow(4);
      else if (w >= 1024) setCardsToShow(3);
      else if (w >= 768) setCardsToShow(2);
      else setCardsToShow(1);
    };
    window.addEventListener("resize", handleResize);
    // Initialise on mount
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev + cardsToShow < mbtiProfiles.length) {
          return prev + cardsToShow;
        } else {
          return 0;
        }
      });
    }, 8000);
    return () => clearInterval(timer);
  }, [cardsToShow]);

  const visibleCards = mbtiProfiles.slice(currentIndex, currentIndex + cardsToShow);

  return (
    <div className="flex min-h-screen flex-col font-sans bg-[#f2f4f3] text-gray-900">
      <main
        className="relative flex flex-col items-center justify-center flex-1 w-full bg-cover bg-center bg-no-repeat min-h-[60vh] pb-12 pt-24"
        style={{ backgroundImage: "url('/home_background.png')" }}
      >
        <AuthHeaderControl />

        <div className="flex flex-col items-center text-center px-4 max-w-3xl mt-12">
          <h1 className="text-5xl md:text-7xl font-serif text-[#1e231f] tracking-wide mb-4">
            MBTI TEST
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-medium mb-8 max-w-xl">
            This is a cognitive assessment to explore your personality preferences and psychologoecological preference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
            <a
              href="/modules-test"
              className="flex-1 bg-[#839b88] hover:bg-[#728877] text-white py-3 rounded-md text-lg font-bold shadow-md transition-colors uppercase tracking-wider text-center"
            >
              Try the test?
            </a>

            <a
              href="/result-history"
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-300 py-3 rounded-md text-lg font-bold shadow-sm transition-colors uppercase tracking-wider text-center"
            >
              View All Results
            </a>
          </div>
        </div>
      </main>

      <section className="bg-[#f0f2f5] py-10 px-4 relative flex items-center justify-center flex-shrink-0 min-h-[280px] overflow-hidden">
        <button
          onClick={handlePrev}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full shadow-md text-xl z-20 transition-colors bg-white hover:bg-gray-100 text-gray-700 cursor-pointer"
        >
          &#10094;
        </button>

        <div key={currentIndex} className="flex gap-6 px-20 py-4 max-w-full w-full justify-center items-stretch animate-in fade-in duration-500">
          {visibleCards.map((card) => (
            <a href={`/MBTI-explain/${card.id}`} key={card.id} className="flex-shrink-0 flex w-72 items-stretch">
              <div className="bg-white w-full rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-start cursor-pointer">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">{card.type}</h3>
                  <h4 className="text-sm font-medium text-gray-800 mb-3 leading-snug">{card.title}</h4>
                </div>
                <div>
                  <p className="text-xs text-gray-600 leading-relaxed">{card.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full shadow-md text-xl z-20 transition-colors bg-white hover:bg-gray-100 text-gray-700 cursor-pointer"
        >
          &#10095;
        </button>
      </section>
      <Footer />
    </div>
  );
}
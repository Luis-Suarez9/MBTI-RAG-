import AccountButton from '../components/accountButton'; // Adjust path if needed
import Footer from '../components/footer'; // Adjust path if needed

// Mock data for the traits bars
const traitsData = [
  { 
    id: 1, label1: 'MIND: E (Extraverted)', val1: 25, 
    label2: 'I (Introverted)', val2: 75, 
    color1: 'bg-[#a37b5b]', color2: 'bg-[#5b7361]' 
  },
  { 
    id: 2, label1: 'ENERGY: S (Observant)', val1: 15, 
    label2: 'N (Intuitive)', val2: 85, 
    color1: 'bg-[#a37b5b]', color2: 'bg-[#5b7361]' 
  },
  { 
    id: 3, label1: 'NATURE: T (Thinking)', val1: 40, 
    label2: 'F (Feeling)', val2: 60, 
    color1: 'bg-[#a37b5b]', color2: 'bg-[#5b7361]' 
  },
  { 
    id: 4, label1: 'TACTICS: J (Judging)', val1: 60, 
    label2: 'P (Prospecting)', val2: 40, 
    color1: 'bg-[#a37b5b]', color2: 'bg-[#5b7361]' 
  },
];

export default function TestDetailPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f2f4f1]">
      {/* Upper Section with Background Image */}
      <div
        className="relative w-full h-[60vh] flex flex-col"
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
        <div className="flex-grow flex flex-col items-center justify-center -mt-8 px-4">
          <h1 className="text-4xl md:text-5xl font-serif text-black tracking-wide mb-6 text-center shadow-sm">
            YOUR MBTI TEST RESULTS
          </h1>

          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-8">
            <h2 className="text-2xl font-serif text-center mb-8 text-black">
              YOUR TYPE: INFJ - THE ADVOCATE
            </h2>

            {/* Trait Progress Bars */}
            <div className="flex flex-col gap-5">
              {traitsData.map((trait) => (
                <div key={trait.id} className="flex items-center justify-center text-sm font-medium text-gray-800">
                  {/* Left Trait */}
                  <div className="w-48 text-right pr-3">{trait.label1}</div>
                  
                  {/* Left Progress Bar (Fills from right to left) */}
                  <div className="w-24 h-[10px] bg-gray-200 relative flex justify-end">
                    <div className={`h-full ${trait.color1}`} style={{ width: `${trait.val1}%` }}></div>
                  </div>
                  <div className="w-12 text-left pl-2">{trait.val1}%]</div>

                  {/* VS Divider */}
                  <div className="text-center w-12 text-gray-500 font-normal">- vs -</div>

                  {/* Right Trait */}
                  <div className="w-24 h-[10px] bg-gray-200 relative flex justify-start">
                    <div className={`h-full ${trait.color2}`} style={{ width: `${trait.val2}%` }}></div>
                  </div>
                  <div className="w-10 text-right pr-2">[{trait.val2}%</div>
                  
                  <div className="w-48 text-left pl-3">{trait.label2}</div>
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
            <p className="text-gray-700 leading-relaxed text-sm">
              INFJs are characterized by their deep sense of integrity and a desire to help
              others achieve their potential. Insightful and visionary, they guide others to
              their higher self.
            </p>
          </div>

          {/* AI Analysis Card */}
          <div className="bg-[#f3f2ed] p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-3 tracking-wide">
              AI-DRIVEN BEHAVIORAL ANALYSIS & USER DESCRIPTION
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm">
              Based on your specific percentages and behavioral research data, you likely
              approach challenges with unique strategic depth. Your high Introverted Intuition
              suggests an intuitive understanding of complex patterns. In team
              environments, you excel at synthesizing multiple perspectives into a cohesive
              whole. People with your profile often show a preference for detailed
              planning and are motivated by finding deeper meaning in their work.
            </p>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="flex justify-between items-center mt-10 mb-4">
            <a href="/">
                <button className="bg-[#829985] text-white px-6 py-2 rounded shadow-sm hover:bg-[#6b826e] transition-colors font-medium cursor-pointer">
                    BACK TO HOME
                </button>
            </a>
        </div>
      </div>

      {/* Reusable Footer Component */}
      <Footer />
    </div>
  );
}
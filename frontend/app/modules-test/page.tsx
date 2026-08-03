"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AccountButton from '../components/accountButton';
import Footer from '../components/footer';

// Define the 8 modules based on the 4 MBTI dichotomies
const modulesData = [
  { id: 1, title: 'Module 1: E or I', description: 'Extraversion vs Introversion (Part 1)' },
  { id: 2, title: 'Module 2: E or I', description: 'Extraversion vs Introversion (Part 2)' },
  { id: 3, title: 'Module 3: S or N', description: 'Sensing vs Intuition (Part 1)' },
  { id: 4, title: 'Module 4: S or N', description: 'Sensing vs Intuition (Part 2)' },
  { id: 5, title: 'Module 5: T or F', description: 'Thinking vs Feeling (Part 1)' },
  { id: 6, title: 'Module 6: T or F', description: 'Thinking vs Feeling (Part 2)' },
  { id: 7, title: 'Module 7: J or P', description: 'Judging vs Prospecting (Part 1)' },
  { id: 8, title: 'Module 8: J or P', description: 'Judging vs Prospecting (Part 2)' },
];

// [DELETED] Removed the `getQuestionsForPage` function here that returned the exact same array for every page.

// Data structure holding the full MBTI question set, grouped by module pages.
const questionsData: Record<number, string[]> = {
  1: [
    '1. I feel full of energy when I am with a big group of people.',
    '2. I like busy places where I can talk to many people.',
    '3. I like to watch how a group acts before I join in.',
    '4. I prefer having a few very close friends instead of a large group of people I know.',
    '5. I much prefer writing my thoughts down instead of speaking them.',
    '6. I often become the center of attention in a group.'
  ],
  2: [
    '7. I find it easy to start talking to strangers at events.',
    '8. I work best in teams where people talk and work together a lot.',
    '9. I feel rested and get my energy back when I spend time completely alone.',
    '10. I like to think deeply about my ideas by myself before I share them.',
    '11. I prefer quiet places without too much noise or action.',
    '12. I like to talk about my ideas out loud with others to make them better.'
  ],
  3: [
    '13. I trust real facts and things I can see more than ideas and theories.',
    '14. I focus mostly on what is happening right now and practical details.',
    '15. I like tasks that have clear, step-by-step instructions.',
    '16. I trust my "gut feelings" and sudden ideas when things are complicated.',
    '17. I prefer looking at the big picture instead of getting stuck on small details.',
    '18. I like to solve completely new problems by thinking of creative ways.'
  ],
  4: [
    '19. I value hands-on experience and common sense over using my imagination.',
    '20. I am good at remembering exact details and facts from the past.',
    '21. I like to solve problems using methods that have worked before.',
    '22. I naturally look for patterns and think about what might happen in the future.',
    '23. I really enjoy talking about big ideas and how things connect.',
    '24. I often spend time imagining new ways the world could work.'
  ],
  5: [
    '25. I use facts and logic to make hard choices, not my feelings.',
    '26. I care more about finding the truth than making sure everyone gets along.',
    '27. I judge if something is right based only on the facts.',
    '28. I think about how people will feel when I make hard choices.',
    '29. I care a lot about others\' feelings and want everyone in a group to be happy.',
    '30. I judge situations by thinking about what people value and how they feel.'
  ],
  6: [
    '31. I think it is much more important to be fair than to be gentle.',
    '32. I can easily put my feelings aside to stay fair and focused.',
    '33. I will point out mistakes in a plan, even if it upsets someone.',
    '34. I think it is much more important to be kind and understanding than strictly fair.',
    '35. I easily feel and take on the moods of the people around me.',
    '36. I often change my plans to make sure others feel included and cared for.'
  ],
  7: [
    '37. I always follow the plans and schedules I make for myself.',
    '38. I only feel relaxed after a final choice has been made.',
    '39. I like to keep my room, files, and daily plans very organized.',
    '40. I am very flexible and like to keep my choices open as long as possible.',
    '41. I do my best in unplanned situations where I have to think fast.',
    '42. I feel excited, not stressed, when plans suddenly change.'
  ],
  8: [
    '43. I prefer to finish my work long before it is due so I do not feel stressed.',
    '44. I handle big projects by breaking them down into clear, small steps.',
    '45. I use clear rules and routines to guide my everyday life.',
    '46. I prefer to work when I suddenly feel like it, rather than following a strict schedule.',
    '47. I leave my plans open so I can easily change them if new things happen.',
    '48. I have a very relaxed and casual way of managing my time and space.'
  ]
};

// Define the scale options with specific colors (Restored to red/green)
const scaleOptions = [
  { value: 1, label: 'Strongly Disagree', color: '#995c5c' }, // Dark Red
  { value: 2, label: 'Disagree', color: '#b88282' },          // Red
  { value: 3, label: 'Neutral', color: '#a3a8a4' },           // Neutral Gray
  { value: 4, label: 'Agree', color: '#8ca190' },             // Green
  { value: 5, label: 'Strongly Agree', color: '#6b826e' },    // Dark Green
];

export default function ModuleTestPage() {
  const router = useRouter();
  
  // State for current page (1 through 8)
  const [currentPage, setCurrentPage] = useState(1);
  
  // State to store answers. Key format: `page-questionIndex`
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [validationMessage, setValidationMessage] = useState('');

  const currentModule = modulesData[currentPage - 1];
  
  // [EDITED] Replaced `getQuestionsForPage(currentPage)` with our new `questionsData` lookup
  const currentQuestions = questionsData[currentPage]; 
  
  const isCurrentPageComplete = currentQuestions.every((_, idx) => typeof answers[`${currentPage}-${idx}`] === 'number');

  // Handle bubble click
  const handleAnswerChange = (questionIndex: number, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [`${currentPage}-${questionIndex}`]: value,
    }));
    setValidationMessage('');
  };

  // Handle Next Page / Submit
  const handleNext = () => {
    if (!isCurrentPageComplete) {
      setValidationMessage('Please answer all questions on this page before continuing.');
      return;
    }

    if (currentPage < 8) {
      setCurrentPage((prev) => prev + 1);
      setValidationMessage('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If on the last page, route to the results page
      router.push('/test-detail');
    }
  };

  // Handle Previous Page
  const handleBack = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
      <main className="flex-grow flex flex-col items-center px-4 pb-20">
        {/* Module Title Pill */}
        <div className="bg-[#788f7b] text-white px-10 py-3 rounded-lg shadow-md mb-2 flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-serif tracking-wide text-center">
            {currentModule.title}
          </h1>
        </div>
        
        {/* Page Indicator */}
        <p className="text-gray-800 font-medium mb-8">Page {currentPage} of 8</p>

        {validationMessage ? (
          <p className="mb-4 text-sm font-medium text-red-600">{validationMessage}</p>
        ) : null}

        {/* Questions Container */}
        <div className="w-full max-w-4xl flex flex-col gap-6">
          {currentQuestions.map((question, idx) => {
            const answerKey = `${currentPage}-${idx}`;
            const selectedValue = answers[answerKey];

            return (
              <div 
                key={idx} 
                className="bg-[#f8f9f7]/95 backdrop-blur-sm rounded-xl p-6 shadow-sm flex flex-col gap-5 border border-gray-100"
              >
                {/* Question Text */}
                <div className="text-gray-800 font-medium text-lg text-center md:text-left">
                  {question}
                </div>

                {/* 5-Bubble Scale with Individual Labels */}
                <div className="flex justify-between items-start w-full max-w-[500px] mx-auto mt-2">
                  {scaleOptions.map((option) => {
                    const isSelected = selectedValue === option.value;
                    return (
                      <label 
                        key={option.value} 
                        className="cursor-pointer flex flex-col items-center justify-start relative group w-20"
                      >
                        <input 
                          type="radio" 
                          name={`question-${currentPage}-${idx}`} 
                          value={option.value}
                          checked={isSelected}
                          onChange={() => handleAnswerChange(idx, option.value)}
                          className="peer sr-only" 
                        />
                        {/* Custom Radio Circle - Outline is ALWAYS colored based on option.color */}
                        <div 
                          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all mb-2 ${
                            isSelected ? 'shadow-md' : 'hover:opacity-80'
                          }`}
                          style={{
                            borderColor: option.color, // Always show the color outline
                          }}
                        >
                          {/* Inner Filled Circle */}
                          <div 
                            className={`w-3.5 h-3.5 rounded-full transition-opacity ${
                              isSelected ? 'opacity-100' : 'opacity-0'
                            }`}
                            style={{ backgroundColor: option.color }} 
                          ></div>
                        </div>
                        {/* Bottom Label - Text is dark consistently regardless of interaction */}
                        <span 
                          className="text-xs text-center font-medium leading-tight text-gray-700"
                        >
                          {option.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons (Back & Next) */}
        <div className="w-full max-w-4xl flex justify-between mt-10">
          {/* Empty div acts as a spacer if on page 1 so the Next button stays on the right */}
          {currentPage > 1 ? (
            <button 
              onClick={handleBack}
              className="bg-white/80 backdrop-blur-sm text-[#788f7b] border-2 border-[#788f7b] px-8 py-3 rounded-lg shadow-sm hover:bg-white transition-colors flex items-center gap-2 font-medium text-lg cursor-pointer"
            >
              <span className="text-xl leading-none">‹</span> Previous
            </button>
          ) : (
            <div></div> 
          )}

          <button 
            onClick={handleNext}
            disabled={!isCurrentPageComplete}
            className={`px-8 py-3 rounded-lg shadow-md transition-colors flex items-center gap-2 font-medium text-lg ${
              isCurrentPageComplete
                ? 'bg-[#788f7b] text-white hover:bg-[#637766] cursor-pointer'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          >
            {currentPage === 8 ? 'Submit Results' : 'Next Page'} 
            {currentPage < 8 && <span className="text-xl leading-none">›</span>}
          </button>
        </div>
      </main>

      {/* Shared Footer Component */}
      <Footer />
    </div>
  );
}
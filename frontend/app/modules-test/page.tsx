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

// Mock generic questions for the mockup (6 per page)
const getQuestionsForPage = (pageNum: number) => [
  `${pageNum}.1. What is your approach to handling sudden changes in your environment?`,
  `${pageNum}.2. How often do you find yourself reflecting on abstract concepts?`,
  `${pageNum}.3. In a group setting, do you prefer to take the lead or observe?`,
  `${pageNum}.4. When making a decision, do you rely more on logic or how others feel?`,
  `${pageNum}.5. How comfortable are you with strictly structured schedules?`,
  `${pageNum}.6. Do you feel energized after spending time in large social gatherings?`,
];

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
  const currentQuestions = getQuestionsForPage(currentPage);
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
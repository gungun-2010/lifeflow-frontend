import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, ShieldCheck, HelpCircle, Heart } from 'lucide-react';

const EligibilityQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [failReason, setFailReason] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  const questions = [
    { q: "Are you between 18 and 65 years old?", cat: "Basic", failMsg: "Age must be 18-65." },
    { q: "Is your weight at least 50 kg?", cat: "Basic", failMsg: "Weight must be 50kg+ for a safe donation." },
    { q: "Have you donated blood in the last 90 days?", cat: "History", failMsg: "A 90-day gap is required between donations.", invert: true },
    { q: "Are you feeling unwell, have a fever, or cold today?", cat: "Health", failMsg: "Please wait until you are fully recovered.", invert: true },
    { q: "Have you taken any antibiotics in the last 7 days?", cat: "Health", failMsg: "You must wait 7 days after completing your course.", invert: true },
    { q: "Have you had any major surgery in the last 6 months?", cat: "History", failMsg: "6 months recovery time is required after major surgery.", invert: true }
  ];

  const handleAnswer = (answer) => {
    const currentQ = questions[currentStep];
    const failed = currentQ.invert ? answer === true : answer === false;

    if (failed) {
      setFailReason(currentQ.failMsg);
      setIsFinished(true);
    } else if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setFailReason("");
    setIsFinished(false);
  };

  return (
    // PT-32 fixes the Navbar collision. MIN-H-SCREEN ensures the page isn't "blank" at the bottom.
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-20 px-4">
      <div className="max-w-xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="text-red-600" size={32} fill="currentColor" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Eligibility Check</h1>
          <p className="text-gray-500 font-medium mt-2">Quickly verify if you can donate today.</p>
        </div>

        {/* Quiz Card */}
        <div className="bg-white border border-gray-100 rounded-[3rem] p-10 shadow-xl shadow-gray-200/50 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!isFinished ? (
              <motion.div 
                key="quiz"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                    <ShieldCheck size={16} className="text-red-500" />
                    <span className="text-[11px] font-black uppercase tracking-widest text-gray-500">
                      {questions[currentStep].cat} Validation
                    </span>
                  </div>
                  <span className="text-sm font-bold text-gray-300">
                    Question {currentStep + 1} of {questions.length}
                  </span>
                </div>
                
                <h2 className="text-2xl font-black text-gray-900 mb-10 leading-tight min-h-[80px]">
                  {questions[currentStep].q}
                </h2>

                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <button 
                    onClick={() => handleAnswer(true)} 
                    className="flex-1 bg-gray-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-red-600 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Yes, I am
                  </button>
                  <button 
                    onClick={() => handleAnswer(false)} 
                    className="flex-1 bg-gray-100 text-gray-600 py-5 rounded-2xl font-black text-lg hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    No
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                  <motion.div 
                      className="h-full bg-red-600" 
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                  ></motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                {failReason ? (
                  <>
                    <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <XCircle size={48} className="text-red-500" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900">Not Eligible Today</h3>
                    <p className="text-gray-500 mt-4 px-6 text-lg leading-relaxed">
                      {failReason}
                    </p>
                    <div className="mt-8 p-4 bg-gray-50 rounded-2xl text-sm text-gray-500 font-medium">
                      Don't worry! You can still help by sharing requirements with others.
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={48} className="text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900">You're a Hero!</h3>
                    <p className="text-gray-500 mt-4 text-lg">
                      You meet all basic requirements for blood donation.
                    </p>
                    <button className="mt-8 w-full bg-red-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-red-700 shadow-lg shadow-red-200 transition-all">
                      FIND NEARBY CENTERS
                    </button>
                  </>
                )}
                
                <button 
                  onClick={reset} 
                  className="mt-8 text-gray-400 font-bold hover:text-red-600 flex items-center gap-2 mx-auto transition-colors"
                >
                  <RotateCcw size={16} /> RESTART QUIZ
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center mt-10 text-gray-400 text-sm font-medium flex items-center justify-center gap-2">
          <HelpCircle size={14} /> This is a basic screening. Final eligibility is determined at the center.
        </p>
      </div>
    </div>
  );
};

export default EligibilityQuiz;
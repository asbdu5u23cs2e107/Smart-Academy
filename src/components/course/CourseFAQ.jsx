import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const CourseFAQ = ({ courseName, faqs }) => {
  const [activeIdx, setActiveIdx] = useState(null);

  const toggle = (idx) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-3">
        <h2 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h2>
        <p className="text-xs text-slate-500 mt-0.5">Answers to the most common queries about this course.</p>
      </div>

      {faqs && faqs.length > 0 ? (
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border bg-white overflow-hidden shadow-sm transition-all duration-300 ${
                  isOpen ? 'border-purple-200 shadow-md' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 select-none"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`w-4 h-4 flex-shrink-0 transition-colors ${isOpen ? 'text-purple-650' : 'text-slate-400'}`} />
                    <span className="text-sm font-semibold text-slate-900">{faq.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-purple-650' : 'rotate-0 text-slate-400'
                    }`}
                  />
                </button>

                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                  <p className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-8 rounded-2xl border border-slate-200 bg-slate-50 text-center text-xs text-slate-500">
          No FAQs available for this course yet.
        </div>
      )}
    </div>
  );
};

export default CourseFAQ;

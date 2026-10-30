import React from 'react';
import { Check } from 'lucide-react';

const steps = [
  { label: 'Personal Details' },
  { label: 'Education' },
  { label: 'Course Details' },
  { label: 'Payment' },
];

const StepProgress = ({ currentStep }) => {
  return (
    <div className="w-full px-2 py-6">
      <div className="flex items-center justify-center">
        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;

          return (
            <React.Fragment key={stepNum}>
              {/* Step */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${isCompleted
                      ? 'bg-purple-650 border-purple-650 text-white'
                      : isActive
                        ? 'bg-purple-650 border-purple-650 text-white shadow-lg shadow-purple-650/30'
                        : 'bg-white border-slate-200 text-slate-400'
                    }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : stepNum}
                </div>
                <span
                  className={`text-[11px] font-semibold text-center whitespace-nowrap transition-colors ${isActive
                      ? 'text-purple-650'
                      : isCompleted
                        ? 'text-slate-700'
                        : 'text-slate-400'
                    }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector */}
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-3 md:mx-5 mb-5 rounded-full transition-colors duration-300 ${stepNum < currentStep ? 'bg-purple-650' : 'bg-slate-200'
                    }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepProgress;

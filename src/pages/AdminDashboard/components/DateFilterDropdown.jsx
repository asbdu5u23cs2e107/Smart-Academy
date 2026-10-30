import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

const DATE_OPTIONS = [
  { value: 'today', label: 'Today' },
  { value: 'last7days', label: 'Last 7 Days' },
  { value: 'last30days', label: 'Last 30 Days' },
  { value: 'last3months', label: 'Last 3 Months' },
  { value: 'thisyear', label: 'This Year' }
];

const DateFilterDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentOption = DATE_OPTIONS.find(opt => opt.value === value) || DATE_OPTIONS[2];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-2.5 text-[13px] font-bold hover:bg-slate-50 transition-colors"
      >
        <Calendar className="w-4 h-4" />
        {currentOption.label}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 bg-white border border-slate-100 rounded-xl shadow-lg py-2 min-w-[180px] z-10">
          {DATE_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm font-semibold hover:bg-purple-50 transition-colors ${
                option.value === value ? 'text-purple-600 bg-purple-50' : 'text-slate-600'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DateFilterDropdown;
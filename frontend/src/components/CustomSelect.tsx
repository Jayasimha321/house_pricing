import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export const CustomSelect = ({ value, options, onChange, name }: { value: string | number, options: {label: string, value: string | number}[], onChange: (e: any) => void, name: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(o => o.value.toString() === value.toString());

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        className={`px-5 py-4 bg-white/70 backdrop-blur-md rounded-2xl cursor-pointer flex justify-between items-center transition-all border ${isOpen ? 'ring-2 ring-yellow-400 border-transparent shadow-md' : 'border-neutral-200 hover:bg-white shadow-sm'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-neutral-700 font-medium text-base md:text-lg">{selectedOption?.label}</span>
        <ChevronDown size={20} className={`transition-transform text-neutral-500 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white/95 backdrop-blur-xl border border-neutral-200 shadow-2xl rounded-2xl py-1 overflow-auto max-h-60 transform origin-top transition-all">
          {options.map((option) => (
            <div 
              key={option.value}
              className={`px-5 py-3 mx-1 rounded-xl cursor-pointer transition-colors flex items-center text-base md:text-lg ${value.toString() === option.value.toString() ? 'bg-yellow-100 text-yellow-800 font-semibold' : 'text-neutral-700 hover:bg-neutral-100/80 font-medium'}`}
              onClick={() => {
                onChange({ target: { name, value: option.value } });
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

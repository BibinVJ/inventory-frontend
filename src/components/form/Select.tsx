import { useState, useEffect, useRef } from "react";
import { ChevronsUpDown, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  defaultValue?: string;
  showPlaceholder?: boolean;
  error?: boolean;
  hint?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  defaultValue = "",
  showPlaceholder = true,
  error = false,
  hint = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);
  const selectRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      searchInputRef.current?.focus();
    }
  }, [isOpen]);
  
  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onChange(value);
    setIsOpen(false);
  };

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedLabel = options.find(option => option.value === selectedValue)?.label || placeholder;

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      <div
        className={`h-11 w-full flex items-center justify-between rounded-lg border bg-transparent px-4 py-2.5 text-sm shadow-theme-xs cursor-pointer ${
          error
            ? "border-red-500"
            : "border-gray-300 dark:border-gray-700"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedValue ? "text-gray-800 dark:text-white/90" : "text-gray-400"}>
          {selectedLabel}
        </span>
        <ChevronsUpDown className="h-4 w-4 text-gray-400" />
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
          <div className="p-2">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ul className="max-h-60 overflow-y-auto">
            {showPlaceholder && !searchTerm && (
              <li
                className="px-4 py-2 text-sm text-gray-500 cursor-default"
              >
                {placeholder}
              </li>
            )}
            {filteredOptions.map(option => (
              <li
                key={option.value}
                className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => handleSelect(option.value)}
              >
                <span>{option.label}</span>
                {selectedValue === option.value && <Check className="h-4 w-4" />}
              </li>
            ))}
            {filteredOptions.length === 0 && (
              <li className="px-4 py-2 text-sm text-gray-500">No options found</li>
            )}
          </ul>
        </div>
      )}
      {hint && (
        <span className={`mt-1.5 block text-xs ${error ? "text-red-500" : "text-gray-500"}`}>
          {hint}
        </span>
      )}
    </div>
  );
};

export default Select;
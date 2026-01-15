// Simple date picker component
import React, { useState } from "react";

const DatePicker = ({ value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value || "");

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onChange({ target: { name: "postDate", value: date } });
    setIsOpen(false);
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => currentYear - i);
  };

  const generateMonths = () => {
    return [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  };

  const generateDays = (month, year) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  return (
    <div className="relative !z-10">
      <input
        type="text"
        value={selectedDate}
        onClick={() => setIsOpen(!isOpen)}
        readOnly
        placeholder={placeholder}
        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 cursor-pointer"
      />

      {isOpen && (
        <div className="absolute !z-50 mt-2 w-64 bg-gray-800 border border-white/20 rounded-lg shadow-xl p-4">
          <div className="flex space-x-2 mb-3">
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="flex-1 bg-white/10 text-white border border-white/20 rounded px-2 py-1"
            >
              {generateYears().map((y) => (
                <option key={y} value={y} className="bg-gray-800">
                  {y}
                </option>
              ))}
            </select>
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="flex-1 bg-white/10 text-white border border-white/20 rounded px-2 py-1"
            >
              {generateMonths().map((m, index) => (
                <option key={m} value={index} className="bg-gray-800">
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-7 gap-1 max-h-40 overflow-y-auto">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center text-purple-300 text-xs font-medium py-1"
              >
                {day}
              </div>
            ))}
            {generateDays(month, year).map((day) => (
              <button
                key={day}
                onClick={() =>
                  handleDateSelect(
                    `${year}-${String(month + 1).padStart(2, "0")}-${String(
                      day
                    ).padStart(2, "0")}`
                  )
                }
                className="text-center p-1 hover:bg-white/10 rounded text-white text-sm transition-colors"
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;

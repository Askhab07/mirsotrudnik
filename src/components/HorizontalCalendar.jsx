import React, { useState, useEffect, useRef } from 'react';

const HorizontalCalendar = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentDate = new Date();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedStartDate, setSelectedStartDate] = useState(currentDate);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const touchStartY = useRef(null);

  const yearRefs = useRef([]);
  const monthRefs = useRef([]);
  const dayRefs = useRef([]);

  useEffect(() => {
    // Прокрутка выбранного дня в центр
    const dayIndex = currentDate.getDate() - 1;
    if (dayRefs.current[dayIndex]) {
      dayRefs.current[dayIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
    
    // Прокрутка выбранного месяца и года в центр
    if (monthRefs.current[selectedMonth]) {
      monthRefs.current[selectedMonth].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }

    if (yearRefs.current[selectedYear - currentYear + 5]) {
      yearRefs.current[selectedYear - currentYear + 5].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [selectedMonth, selectedYear]);

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    return new Date(selectedYear, selectedMonth, i + 1);
  });

  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString('default', { month: 'long' })
  );

  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  const handleSelectDate = (day, index) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(day);
      setSelectedEndDate(null);
    } else if (selectedStartDate && !selectedEndDate) {
      if (day >= selectedStartDate) {
        setSelectedEndDate(day);
      } else {
        setSelectedStartDate(day);
      }
    }
    if (dayRefs.current[index]) {
      dayRefs.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  };

  const handleSelectMonth = (monthIndex) => {
    setSelectedMonth(monthIndex);
    setSelectedStartDate(new Date(selectedYear, monthIndex, 1));
    setSelectedEndDate(new Date(selectedYear, monthIndex, daysInMonth));
    if (monthRefs.current[monthIndex]) {
      monthRefs.current[monthIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  };

  const handleSelectYear = (year, index) => {
    setSelectedYear(year);
    if (yearRefs.current[index]) {
      yearRefs.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  };

  const isDateInRange = (day) => {
    return (
      selectedStartDate &&
      selectedEndDate &&
      day >= selectedStartDate &&
      day <= selectedEndDate
    );
  };

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    const touchEndY = e.touches[0].clientY;
    const deltaY = touchEndY - touchStartY.current;

    if (deltaY > 50 && !isExpanded) {
      setIsExpanded(true);
    } else if (deltaY < -50 && isExpanded) {
      setIsExpanded(false);
    }
  };

  return (
    <div
      className="flex flex-col gap-5 items-center bg-white shadow rounded-3xl p-4"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="w-full max-w-md mx-auto">
        <div className="text-center text-lg font-semibold mb-4">
          {months[selectedMonth]} {selectedYear}
        </div>

        <div
          className={`transition-all duration-300 overflow-hidden ${
            isExpanded ? 'max-h-96' : 'max-h-0'
          }`}
        >
          <div className="flex overflow-x-auto space-x-4 scrollbar-hide mb-4">
            {years.map((year, index) => (
              <div
                key={year}
                ref={(el) => (yearRefs.current[index] = el)}
                className={`px-4 py-2 rounded-lg cursor-pointer text-center ${
                  selectedYear === year
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-blue-100'
                }`}
                onClick={() => handleSelectYear(year, index)}
              >
                {year}
              </div>
            ))}
          </div>

          <div className="flex overflow-x-auto space-x-4 scrollbar-hide mb-4">
            {months.map((month, index) => (
              <div
                key={index}
                ref={(el) => (monthRefs.current[index] = el)}
                className={`px-4 py-2 rounded-lg cursor-pointer text-center ${
                  selectedMonth === index
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-blue-100'
                }`}
                onClick={() => handleSelectMonth(index)}
              >
                {month}
              </div>
            ))}
          </div>
        </div>

        <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
          {days.map((day, index) => (
            <div
              key={index}
              ref={(el) => (dayRefs.current[index] = el)}
              className={`flex flex-col items-center justify-center min-w-10 h-16 rounded-lg transition-all cursor-pointer ${
                selectedStartDate?.toDateString() === day.toDateString()
                  ? 'bg-blue-600 text-white'
                  : selectedEndDate?.toDateString() === day.toDateString()
                  ? 'bg-red-500 text-white'
                  : isDateInRange(day)
                  ? 'bg-blue-300 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-blue-100'
              }`}
              onClick={() => handleSelectDate(day, index)}
            >
              <span className="text-xl font-bold">{day.getDate()}</span>
              <span className="text-sm">
                {day.toLocaleDateString('ru-RU', { weekday: 'short' })}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-16 h-1 bg-gray-400 rounded-full" />
    </div>
  );
};

export default HorizontalCalendar;

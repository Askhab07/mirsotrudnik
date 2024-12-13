import React, { useState } from 'react';
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/solid';

const SearchExpense = ({ searchQuery, onSearchChange }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div
        className={`flex justify-between items-center w-[335px] h-10 ${
          isFocused ? 'border-blue-400 ring-2 ring-blue-300' : 'bg-gray-300'
        } transition-all duration-300 rounded-lg px-3 text-blue-500 mb-3`}
      >
        <input
          className="w-64 bg-inherit outline-none placeholder:text-white"
          type="text"
          placeholder="Поиск..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)} // Вызываем переданный обработчик
          onFocus={() => setIsFocused(true)} // Устанавливаем фокус
          onBlur={() => setIsFocused(false)} // Сбрасываем фокус
        />
        <MagnifyingGlassCircleIcon className={`size-6 ${isFocused ? 'text-blue-500' : 'text-white'}`} />
      </div>
    );
};

export default SearchExpense;

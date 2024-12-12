import { Link } from 'react-router-dom';
import {
  AdjustmentsHorizontalIcon,
  DocumentPlusIcon,
} from '@heroicons/react/24/solid';
import SearchExpense from '../layout/expense/SearchExpense';
import React, { useState, useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import ListExponse from '../layout/expense/ListExponse';
import FilterExpense from '../layout/expense/FilterExpense';

const Expense = () => {
  const { expense } = useContext(ExpenseContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLogin, setSelectedLogin] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [searchQuery, setSearchQuery] = useState(''); // Новое состояние для поиска

  const filteredExpenses = expense.filter((r) => {
    const expenseDate = new Date(r.date).setHours(0, 0, 0, 0); // Устанавливаем время на начало дня
    const startDate = dateRange.start
      ? new Date(dateRange.start).setHours(0, 0, 0, 0)
      : null;
    const endDate = dateRange.end
      ? new Date(dateRange.end).setHours(23, 59, 59, 999)
      : null; // Конец дня

    const matchesLogin = selectedLogin ? r.login === selectedLogin : true;
    const matchesDate =
      (!startDate || expenseDate >= startDate) &&
      (!endDate || expenseDate <= endDate);

    const matchesSearch =
      r.login?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      false ||
      r.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      false ||
      (typeof r.comment === 'string' &&
        r.comment.toLowerCase().includes(searchQuery.toLowerCase())) ||
      false;

    return matchesLogin && matchesDate && matchesSearch;
  });

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen pt-8 pb-24 px-5 bg-gray-50">
      <h1 className="text-2xl text-whitetext-3xl mb-5 font-semibold">Расход</h1>
      <SearchExpense
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />{' '}
      {/* Передаем props */}
      <div className={`flex flex-col items-end transition-all ease-in-out delay-100 duration-300 ${isOpen ? '' : 'mb-3'}`}>
      <AdjustmentsHorizontalIcon
        className="size-6 cursor-pointer"
        onClick={handleClick}
      />
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0'
        } w-[335px]`}
      >
        <FilterExpense
          selectedLogin={selectedLogin}
          onLoginChange={setSelectedLogin}
          dateRange={dateRange}
          onDateChange={setDateRange}
          expense={expense}
        />
      </div>
    </div>
      <ListExponse expense={filteredExpenses} />
      <div className="flex justify-between fixed bottom-24 right-5">
        <Link
          className="w-14 h-14 bg-white shadow flex justify-center items-center text-xl rounded-xl"
          to="/expense/add"
        >
          <DocumentPlusIcon className="size-6 text-blue-600" />
        </Link>
      </div>
    </div>
  );
};

export default Expense;

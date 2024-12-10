import { Link } from 'react-router-dom';
import { DocumentPlusIcon } from '@heroicons/react/24/solid';
import SearchReport from '../components/SearchReport';
import React, { useState, useContext } from 'react';
import { ReportsContext } from '../context/ReportsContext';
import ListReport from '../components/ListReport';
import FilterReport from '../components/FilterReport';

const Report = () => {
  const { report } = useContext(ReportsContext);
  const [selectedLogin, setSelectedLogin] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [searchQuery, setSearchQuery] = useState(''); // Новое состояние для поиска

  const filteredReports = report.filter((r) => {
    const reportDate = new Date(r.date).setHours(0, 0, 0, 0); // Устанавливаем время на начало дня
    const startDate = dateRange.start ? new Date(dateRange.start).setHours(0, 0, 0, 0) : null;
    const endDate = dateRange.end ? new Date(dateRange.end).setHours(23, 59, 59, 999) : null; // Конец дня
    
    const matchesLogin = selectedLogin ? r.login === selectedLogin : true;
    const matchesDate =
      (!startDate || reportDate >= startDate) &&
      (!endDate || reportDate <= endDate);

      const matchesSearch = (r.login?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
      (r.category?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
      (r.comment?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
  
    return matchesLogin && matchesDate && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-8 pb-24 px-5">
      <h1 className="text-2xl text-whitetext-3xl mb-5 font-semibold">Отчеты</h1>
      <SearchReport searchQuery={searchQuery} onSearchChange={setSearchQuery} /> {/* Передаем props */}
      <FilterReport
        selectedLogin={selectedLogin}
        onLoginChange={setSelectedLogin}
        dateRange={dateRange}
        onDateChange={setDateRange}
        report={report}
      />
      <ListReport report={filteredReports} />
      <div className="flex justify-between fixed bottom-24 right-5">
        <Link
          className="w-14 h-14 bg-blue-600 flex justify-center items-center text-xl rounded-lg"
          to="/report/add"
        >
          <DocumentPlusIcon className="size-6 text-white" />
        </Link>
      </div>
    </div>
  );
};

export default Report;

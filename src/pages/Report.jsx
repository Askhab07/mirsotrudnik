import React from 'react';
import HorizontalCalendar from '../components/HorizontalCalendar';

const Report = () => {
  return (
    <div className="min-h-screen pt-8 pb-24 px-5">
      <h1 className="text-2xl text-whitetext-3xl mb-5 font-semibold">Отчет</h1>
      <HorizontalCalendar />
    </div>
  );
};

export default Report;

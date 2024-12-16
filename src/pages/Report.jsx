import React, { useContext, useState } from 'react';
import HorizontalCalendar from '../components/HorizontalCalendar';
import TableReport from '../layout/report/TableReport';
import { ShiftsContext } from '../context/ShiftsContext';

const Report = () => {
  const { shifts } = useContext(ShiftsContext);

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleDateChange = (startDate, endDate) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
  };

  const filteredShifts = shifts.filter((shift) => {
    const shiftDate = new Date(shift.date); // Убедитесь, что `shift.date` - это дата или преобразуйте в `Date`.
    if (selectedStartDate && selectedEndDate) {
      return shiftDate >= selectedStartDate && shiftDate <= selectedEndDate;
    }
    return true; // Если даты не выбраны, показываем все.
  });

  return (
    <div className="min-h-screen pt-8 pb-24 px-5">
      <h1 className="text-2xl text-whitetext-3xl mb-5 font-semibold">Отчет</h1>
      <div className="flex flex-col gap-5">
        <HorizontalCalendar onDateChange={handleDateChange} />
        <TableReport data={filteredShifts} title='Отчет о смене' />
      </div>
    </div>
  );
};

export default Report;

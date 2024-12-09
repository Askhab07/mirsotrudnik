import React, { useContext, useState } from 'react';
import { ReportsContext } from '../context/ReportsContext';

const ListReport = () => {
  const { report } = useContext(ReportsContext);
  const [isOpen, setIsOpen] = useState(false);

  if (!report) {
    return <div>Загрузка...</div>;
  }

  if (report.length === 0) {
    return <div className='h-96 flex items-center justify-center font-semibold text-xl'>Нет данных на сервере.</div>
  }
  const handleOpen = (report_id) => {
    setIsOpen((prev) => (prev === report_id ? null : report_id));
  };

  return (
      <ul className="flex flex-col gap-3 pb-16">
        {report.map((report) => (
          <li
            key={report.report_id}
            className="w-[335px] min-h-20 bg-blue-500 rounded-lg"
            onClick={() => handleOpen(report.report_id)}
          >
            <div className="h-20 px-3 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">{report.login}</h2>
              <h2 className="text-xl text-white">
                <span>{report.category}</span>: {report.amount}₽
              </h2>
            </div>
            {isOpen === report.report_id && (
              <div className="w-[335px] h-20 px-3 flex flex-col justify-center bg-blue-700 rounded-b-lg">
                <h2 className="text-blue-400">
                  {new Date(report.date).toLocaleDateString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  }) + 'г'}
                </h2>
                <h2 className="text-white">{report.comment}</h2>
              </div>
            )}
          </li>
        ))}
      </ul>
  );
};

export default ListReport;

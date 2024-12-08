import React, { useEffect, useState } from 'react';
import { url } from '../api/url';
import axios from 'axios';

const ListReport = () => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('report');
    return savedData ? JSON.parse(savedData) : null;
  });
  const [isOpen, setIsOpen] = useState(false);
  
  // Это флаг, чтобы избежать ненужных запросов
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    // Если данные уже загружены, не делаем запрос
    if (isDataFetched) return;

    // Запрос к серверу
    axios
      .get(url, {
        params: {
          action: 'getReport',
        },
      })
      .then((response) => {
        // Проверяем, изменились ли данные
        const newData = response.data;
        
        if (JSON.stringify(newData) !== JSON.stringify(data)) {
          // Если данные изменились, обновляем их и сохраняем в localStorage
          setData(newData);
          localStorage.setItem('report', JSON.stringify(newData));
        }
        // Отмечаем, что данные были загружены
        setIsDataFetched(true);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [isDataFetched, data]);

  if (!data) {
    return <div>Загрузка...</div>;
  }

  const handleOpen = (report_id) => {
    setIsOpen((prev) => (prev === report_id ? null : report_id));
  };

  return (
    <ul className="flex flex-col gap-3 pb-16">
      {data.map((report) => (
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

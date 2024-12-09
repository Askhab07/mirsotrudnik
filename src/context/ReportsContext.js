import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { url } from '../api/url'; // Путь к вашему API

// Создаем контекст для отчетов
export const ReportsContext = createContext();

export const ReportsProvider = ({ children }) => {
  // Храним данные отчетов в состоянии
  const [report, setReport] = useState(() => {
    const savedData = localStorage.getItem('report');
    return savedData ? JSON.parse(savedData) : [];
  });
  const [error, setError] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Эффект для загрузки данных
  useEffect(() => {
    if (isDataFetched) return; // Если данные уже загружены, не делаем запрос

    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, { 
          params: { 
            action: 'getReport'
           } 
          })

          const newData = response.data;

        // Проверяем, изменились ли данные
        if (JSON.stringify(newData) !== JSON.stringify(report)) {
          setReport(newData);
          localStorage.setItem('report', JSON.stringify(newData)); // Сохраняем в localStorage
        }

        setIsDataFetched(true); // Отмечаем, что данные загружены
      } catch(err) {
        setError(err)
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [isDataFetched, report]);

  // Функция для добавления нового отчета
  const handleAddReport = async (reportData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(url, reportData, {
        params: { action: 'addReport' },
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      });

      setReport((prevUsers) => {
        const updatedReport = [...prevUsers, response.data];
        localStorage.setItem('users', JSON.stringify(updatedReport));
        return updatedReport;
      });

      alert('Отчет успешно добавлен!');
      setIsDataFetched(false);
    } catch (error) {
      console.error('Ошибка при добавлении отчета:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ReportsContext.Provider value={{ report, isLoading, error, handleAddReport }}>
      {children}
    </ReportsContext.Provider>
  );
};

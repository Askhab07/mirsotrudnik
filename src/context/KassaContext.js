import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { url } from '../api/url'; // Путь к вашему API

// Создаем контекст для отчетов
export const KassaContext = createContext();

export const KassaProvider = ({ children }) => {
  // Храним данные отчетов в состоянии
  const [kassa, setKassa] = useState(() => {
    const savedData = localStorage.getItem('kassa');
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
            action: 'getTransaction'
           } 
          })

          const newData = response.data;

        // Проверяем, изменились ли данные
        if (JSON.stringify(newData) !== JSON.stringify(kassa)) {
          setKassa(newData);
          localStorage.setItem('kassa', JSON.stringify(newData)); // Сохраняем в localStorage
        }

        setIsDataFetched(true); // Отмечаем, что данные загружены
      } catch(err) {
        setError(err)
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [isDataFetched, kassa]);

  // Функция для добавления нового отчета
  const handleAddKassa = async (kassaData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(url, kassaData, {
        params: { action: 'addTransaction' },
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      });

      setKassa((prevUsers) => {
        const updatedKassa = [...prevUsers, response.data];
        localStorage.setItem('users', JSON.stringify(updatedKassa));
        return updatedKassa;
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
    <KassaContext.Provider value={{ kassa, isLoading, error, handleAddKassa }}>
      {children}
    </KassaContext.Provider>
  );
};

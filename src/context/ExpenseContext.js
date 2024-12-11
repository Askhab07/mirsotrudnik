import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { url } from '../api/url'; // Путь к вашему API

// Создаем контекст для отчетов
export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  // Храним данные отчетов в состоянии
  const [expense, setExpense] = useState(() => {
    const savedData = localStorage.getItem('expense');
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
            action: 'getExpense'
           } 
          })

          const newData = response.data;

        // Проверяем, изменились ли данные
        if (JSON.stringify(newData) !== JSON.stringify(expense)) {
          setExpense(newData);
          localStorage.setItem('expense', JSON.stringify(newData)); // Сохраняем в localStorage
        }

        setIsDataFetched(true); // Отмечаем, что данные загружены
      } catch(err) {
        setError(err)
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [isDataFetched, expense]);

  // Функция для добавления нового отчета
  const handleAddExpense = async (expenseData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(url, expenseData, {
        params: { action: 'addExpense' },
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      });

      setExpense((prevUsers) => {
        const updatedExpense = [...prevUsers, response.data];
        localStorage.setItem('users', JSON.stringify(updatedExpense));
        return updatedExpense;
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
    <ExpenseContext.Provider value={{ expense, isLoading, error, handleAddExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { url } from '../api/url';

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    // Загружаем пользователей из localStorage, если они сохранены
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);

  // Эффект для загрузки данных пользователей
  useEffect(() => {
    // Если данные уже загружены, не делаем запрос
    if (isDataFetched) return;

    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, {
          params: {
            action: 'getUsers',
          },
        });
        
        const newData = response.data;
        
        // Проверяем, изменились ли данные
        if (JSON.stringify(newData) !== JSON.stringify(users)) {
          setUsers(newData); // Обновляем состояние пользователей
          localStorage.setItem('users', JSON.stringify(newData)); // Сохраняем в localStorage
        }

        setIsDataFetched(true);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [isDataFetched, users]);

  // Функция для добавления нового пользователя
  const handleAddUser = async (userData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(url, userData, {
        params: { action: 'addUser' },
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      });

      // Добавляем нового пользователя в состояние и обновляем localStorage
      setUsers((prevUsers) => {
        const updatedUsers = [...prevUsers, response.data];
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        return updatedUsers;
      });

      alert('Пользователь добавлен!');
      setIsDataFetched(false)
    } catch (err) {
      console.error('Ошибка при добавлении пользователя:', err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Возвращаем все необходимые данные через контекст
  return (
    <UsersContext.Provider value={{ users, isLoading, error, handleAddUser }}>
      {children}
    </UsersContext.Provider>
  );
};

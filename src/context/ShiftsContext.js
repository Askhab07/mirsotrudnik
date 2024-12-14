import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { url } from '../api/url';

export const ShiftsContext = createContext();

export const ShiftsProvider = ({ children }) => {

  const [shifts, setShifts] = useState(() => {
    const savedData = localStorage.getItem('shifts');
    return savedData ? JSON.parse(savedData) : [];
  });
  const [error, setError] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isDataFetched) return;

    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, { 
          params: { 
            action: 'getShifts'
           } 
          })

          const newData = response.data;

        if (JSON.stringify(newData) !== JSON.stringify(shifts)) {
          setShifts(newData);
          localStorage.setItem('shifts', JSON.stringify(newData));
        }

        setIsDataFetched(true);
      } catch(err) {
        setError(err)
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [isDataFetched, shifts]);

  const handleAddShifts = async (shiftsData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(url, shiftsData, {
        params: { action: 'addShifts' },
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      });

      setShifts((prevUsers) => {
        const updatedShifts = [...prevUsers, response.data];
        localStorage.setItem('shifts', JSON.stringify(updatedShifts));
        return updatedShifts;
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
    <ShiftsContext.Provider value={{ shifts, isLoading, error, handleAddShifts }}>
      {children}
    </ShiftsContext.Provider>
  );
};

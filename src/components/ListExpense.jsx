import axios from 'axios';
import { useEffect, useState } from 'react';
import { url } from '../../api/url';

const ListExpenses = () => {
  const [expenses, setExpenses] = useState([]); // Список расходов
  const [isLoading, setIsLoading] = useState(true); // Статус загрузки
  const [error, setError] = useState(''); // Сообщение об ошибке

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(url, {
          params: { action: 'getExpenses' }, // Укажите action для получения расходов
        });

        if (response.data.status === 'success') {
          setExpenses(response.data.expenses || []);
        } else {
          setError(response.data.message || 'Ошибка при загрузке данных.');
        }
      } catch (err) {
        setError('Ошибка подключения к серверу: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-3xl text-gray-500">Загрузка...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-2xl text-red-500">{error}</p>
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-2xl text-gray-400">Расходы не найдены.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-800 p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Список расходов</h1>
      <ul className="flex flex-col gap-4">
        {expenses.map((expense, index) => (
          <li
            key={index}
            className="bg-gray-700 text-white p-4 rounded-lg flex flex-col gap-2"
          >
            <div>
              <span className="font-bold">Логин:</span> {expense.login}
            </div>
            <div>
              <span className="font-bold">Дата:</span> {expense.date}
            </div>
            <div>
              <span className="font-bold">Штраф:</span>{' '}
              {expense.fine ? `${expense.fine} руб.` : 'Нет'}
            </div>
            <div>
              <span className="font-bold">Комментарий к штрафу:</span>{' '}
              {expense.fine_comment || 'Нет'}
            </div>
            <div>
              <span className="font-bold">Долг:</span>{' '}
              {expense.duty ? `${expense.duty} руб.` : 'Нет'}
            </div>
            <div>
              <span className="font-bold">Комментарий к долгу:</span>{' '}
              {expense.duty_comment || 'Нет'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListExpenses;

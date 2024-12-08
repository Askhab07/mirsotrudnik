import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { url } from '../api/url';

const AddReport = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [login, setLogin] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    axios
      .get(url, {
        params: {
          action: 'getUsers',
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке данных:', error);
      });
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen text-3xl text-blue-800 font-bold animate-pulse">
        Загрузка...
      </div>
    );
  }

  const handleClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      // Генерация текущей даты в формате DD.MM.YYYY
      const currentDate = new Date().toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
  
      // Тело запроса
      const requestData = {
        login,
        date: currentDate,
        category,
        amount: Number(amount), // Преобразуем сумму в число
        comment,
      };
  
      const response = await axios.post(
        url, // URL сервера
        requestData, // Тело запроса
        {
          params: {
            action: 'addReport', // Действие
          },
          headers: {
            'Content-Type': 'text/plain;charset=UTF-8', // Корректный Content-Type
          },
        }
      );
  
      console.log('Успешный ответ:', response.data);
      alert('Добавлено!')
  
      // Очистка формы после успешного добавления
      setLogin('');
      setCategory('');
      setAmount('');
      setComment('');
    } catch (error) {
      if (error.response) {
        console.error('Ответ с ошибкой от сервера:', error.response.data);
      } else if (error.request) {
        console.error('Запрос был отправлен, но ответа нет:', error.request);
      } else {
        console.error('Произошла ошибка при настройке запроса:', error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen px-5 pt-8 pb-24">
      <h1 className="text-xl font-bold mb-8">
        Добавить штраф или долг
      </h1>
      <form className="flex flex-col gap-5" onSubmit={handleClick}>
        <select
          name=""
          id=""
          className="w-[335px] h-14 rounded-lg pl-3 text-xl border-2 border-blue-400 outline-blue-600"
          required
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        >
          <option value="" disabled>
            Логин
          </option>
          {data.map((user) => (
            <option key={user.userId} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
        <select
          className="w-[335px] h-14 rounded-lg pl-3 text-xl border-2 border-blue-400 outline-blue-600"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>
            Выберите долг или штраф
          </option>
          <option value="Долг">Долг</option>
          <option value="Штраф">Штраф</option>
        </select>
        <input
          type="number"
          className="w-[335px] h-14 rounded-lg pl-3 text-xl border-2 border-blue-400 outline-blue-600"
          placeholder="Введите сумму"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <textarea
          className="w-[335px] h-20 rounded-lg pl-3 pt-3 text-xl border-2 border-blue-400 outline-blue-600"
          placeholder="Введите комментарий"
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        <button
          className="w-[335px] h-14 bg-blue-700 rounded-lg text-white text-xl font-bold disabled:text-blue-200 disabled:bg-blue-400"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Подождите' : 'Добавить'}
        </button>
      </form>
    </div>
  );
};

export default AddReport;

import { ArrowRightCircleIcon, UserIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { url } from '../../api/url';
import { useEffect, useState } from 'react';

const ListUsers = () => {
  const [activeUserId, setActiveUserId] = useState(null); // Храним ID активного пользователя
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('users');
    return savedData ? JSON.parse(savedData) : null;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Запрашиваем данные с сервера
        const response = await axios.get(url);
        const { users, lastUpdated } = response.data;

        // Получаем сохраненные данные
        const savedData = JSON.parse(localStorage.getItem('users'));
        const savedLastUpdated = localStorage.getItem('usersLastUpdated');

        // Сравниваем данные и обновляем при необходимости
        if (!savedData || savedLastUpdated !== lastUpdated) {
          setData(users);
          localStorage.setItem('users', JSON.stringify(users));
          localStorage.setItem('usersLastUpdated', lastUpdated);
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <p className="flex justify-center text-3xl text-red-400">Загрузка...</p>
    );
  }

  // Функция для переключения аккордеона
  const toggleAccordion = (userId) => {
    setActiveUserId(activeUserId === userId ? null : userId); // Скрываем, если тот же ID
  };

  return (
    <ul className="flex flex-col gap-5 pb-40">
      {data.map((d) => (
        <li
          key={d.user_id}
          className="w-80 min-h-20 flex flex-col bg-sky-600 rounded-lg text-white"
          onClick={() => toggleAccordion(d.user_id)}
        >
          <div
            className="w-full flex items-center px-3 h-20 cursor-pointer"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-sky-800 rounded-full">
              <UserIcon className="size-6" />
            </div>
            <h2 className="w-[200px] text-2xl font-semibold mx-3">{d.name}</h2>
            <ArrowRightCircleIcon
              className={`size-6 transition-transform ${
                activeUserId === d.user_id ? 'rotate-90' : ''
              }`}
            />
          </div>
          {activeUserId === d.user_id && ( // Раскрываемый контент
            <div className="p-3 bg-sky-700 rounded-b-lg">
              <h2 className='text-sky-400'>
                <span className="font-bold text-white">ID:</span> {d.user_id}
              </h2>
              <h2 className='text-sky-400'>
                <span className="font-bold text-white">Дата добавления:</span> {new Date(d.date).toLocaleDateString('ru-RU')}
              </h2>
              <h2 className='text-sky-400'>
                <span className="font-bold text-white">Имя:</span> {d.name}
              </h2>
              <h2 className='text-sky-400'>
                <span className="font-bold text-white">Логин:</span> {d.login}
              </h2>
              <h2 className='text-sky-400'>
                <span className="font-bold text-white">Пароль:</span> {d.password}
              </h2>
              <h2 className='text-sky-400'>
                <span className="font-bold text-white">Должность:</span> {d.role}
              </h2>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ListUsers;

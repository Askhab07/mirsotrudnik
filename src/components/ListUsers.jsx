import { ArrowRightCircleIcon, UserIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { url } from '../api/url';

const ListUsers = () => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('users');
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
          action: 'getUsers',
        },
      })
      .then((response) => {
        // Проверяем, изменились ли данные
        const newData = response.data;
        
        if (JSON.stringify(newData) !== JSON.stringify(data)) {
          // Если данные изменились, обновляем их и сохраняем в localStorage
          setData(newData);
          localStorage.setItem('users', JSON.stringify(newData));
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
    <ul className="flex flex-col gap-3 pb-40">
        {data.map(user => (
          <li
          className="w-[335px] min-h-20 flex flex-col bg-blue-500 rounded-lg text-white"
          onClick={() => handleOpen(user.user_id)}
        >
          <div
            className="w-full flex items-center px-3 h-20 cursor-pointer"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-blue-800 rounded-full">
              <UserIcon className="size-6" />
            </div>
            <h2 className="w-[210px] text-xl font-semibold mx-3">{user.name}</h2>
            <ArrowRightCircleIcon
              className={`size-8 transition-transform ${isOpen === user.user_id ? 'rotate-90' : ''}`}
            />
          </div>
            {isOpen === user.user_id && <div className="p-3 bg-blue-700 rounded-b-lg">
              <h2 className='text-white font-semibold flex justify-between'>
                <span className="text-blue-400 font-normal">ID:</span>
                {user.user_id}
              </h2>
              <h2 className='text-white font-semibold flex justify-between'>
                <span className="text-blue-400 font-normal">Дата добавления:</span>
                {new Date(user.date).toLocaleDateString('ru-RU', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                }) + 'г'}
              </h2>
              <h2 className='text-white font-semibold flex justify-between'>
                <span className="text-blue-400 font-normal">Логин:</span>
                {user.login}
              </h2>
              <h2 className='text-white font-semibold flex justify-between'>
                <span className="text-blue-400 font-normal">Пароль:</span> 
                {user.password}
              </h2>
              <h2 className='text-white font-semibold flex justify-between'>
                <span className="text-blue-400 font-normal">Должность:</span> 
                {user.role}
              </h2>
              <h2 className='text-white font-semibold flex justify-between'>
                <span className="text-blue-400 font-normal">Дневная ставка:</span> 
                {user.salary}₽
              </h2>
            </div>}
        </li>
        ))}
    </ul>
  );
};

export default ListUsers;

import axios from 'axios';
import { url } from '../../api/url';
import { useState } from 'react';

const AddUsers = () => {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsloading] = useState(false);

  const handleClick = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы
    setIsloading(true);
    // Проверяем, заполнены ли все поля
    if (!name || !login || !password || !role) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }

    // Очищаем ошибку и отправляем запрос
    setError('');
    axios
      .post(
        url,
        {
          action: 'addUser',
          name: name,
          login: login,
          password: password,
          role: role,
        },
        {
          headers: {
            'Content-Type': 'text/plain;charset=UTF-8',
          },
        }
      )
      .then((response) => {
        if (response.data.status === 'success') {
          console.log('Пользователь успешно создан:', response.data);
          // Очищаем поля только при успешном запросе
          setName('');
          setLogin('');
          setPassword('');
          setRole('');
          setIsloading(false);
        } else {
          // Если сервер вернул ошибку
          setError(response.data.message || 'Не удалось создать пользователя.');
          setIsloading(false);
        }
      })
      .catch((error) => {
        console.error('Ошибка при создании пользователя:', error);
        // Устанавливаем сообщение об ошибке
        setError('Не удалось создать пользователя. Попробуйте снова.');
        setIsloading(false);
      });
  };

  return (
    <div className='min-h-screen bg-sky-800 px-8 pt-8 pb-24'>
      <h1 className="text-2xl text-white mb-5 font-semibold">Добавь нового сотрудника</h1>
      <form className="flex flex-col items-center gap-5" onSubmit={handleClick}>
        {error && <div className="text-red-500 text-center mb-3">{error}</div>}
        <input
          className="w-80 h-14 rounded-lg pl-3 text-xl"
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="w-80 h-14 rounded-lg pl-3 text-xl"
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
        <input
          className="w-80 h-14 rounded-lg pl-3 text-xl"
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select
          className="w-80 h-14 rounded-lg pl-3 text-xl"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="" disabled>
            Должность
          </option>
          <option value="Оператор">Оператор</option>
          <option value="Завсклад">Завсклад</option>
          <option value="Торговый">Торговый</option>
          <option value="Водитель">Водитель</option>
          <option value="Грузчик">Грузчик</option>
        </select>
        <button
          className="w-80 h-14 bg-sky-700 rounded-lg text-white text-xl font-bold disabled:text-gray-300 disabled:bg-sky-400 disabled:text-sky-300"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Подождите' : 'Создать пользователя'}
        </button>
      </form>
    </div>
  );
};

export default AddUsers;

import axios from 'axios';
import { url } from '../api/url';
import { useEffect, useState } from 'react';

const AddUsers = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [salary, setSalary] = useState('');

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Ошибка при загрузке данных:', error));
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen text-3xl text-blue-800 font-bold animate-pulse">
        Загрузка...
      </div>
    );
  }

  const handleAddUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const requestData = {
      name,
      login,
      password,
      role,
      salary: Number(salary),
    };

    try {
      const response = await axios.post(url, requestData, {
        params: {
          action: 'addUser',
        },
        headers: {
          'Content-Type': 'text/plain;charset=UTF-8',
        },
      });

      alert('Добавлено!');
      console.log(response.data);
      setName('');
      setLogin('');
      setPassword('');
      setRole('');
      setSalary('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen px-8 pt-8 pb-16">
      <h1 className="text-2xl mb-5 font-semibold">Добавь нового сотрудника</h1>
      <form
        className="flex flex-col items-center gap-5"
        onSubmit={handleAddUser}
      >
        <input
          className="w-[335px] h-14 rounded-lg pl-3 text-xl border-2 border-blue-400 outline-blue-600"
          type="text"
          placeholder="Имя"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-[335px] h-14 rounded-lg pl-3 text-xl border-2 border-blue-400 outline-blue-600"
          type="text"
          placeholder="Логин"
          required
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          className="w-[335px] h-14 rounded-lg pl-3 text-xl border-2 border-blue-400 outline-blue-600"
          type="text"
          placeholder="Пароль"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          className="w-[335px] h-14 rounded-lg pl-3 text-xl border-2 border-blue-400 outline-blue-600"
          name="role"
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
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
        <input
          type="number"
          className="w-[335px] h-14 rounded-lg pl-3 text-xl border-2 border-blue-400 outline-blue-600"
          placeholder="Дневная ставка"
          required
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
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

export default AddUsers;

import { useContext, useState } from 'react';
import { UsersContext } from '../context/UsersContext';

const AddUsers = () => {
  const {users, isLoading, handleAddUser} = useContext(UsersContext);
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [salary, setSalary] = useState('');

  if (!users) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen text-3xl text-blue-800 font-bold animate-pulse">
        Загрузка...
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name,
      login,
      password,
      role,
      salary: Number(salary),
    };

    handleAddUser(newUser); // Отправляем запрос для добавления пользователя

    // Очищаем поля формы
    setName('');
    setLogin('');
    setPassword('');
    setRole('');
    setSalary('');
  }; 

  return (
    <div className="min-h-screen px-8 pt-8 pb-16">
      <h1 className="text-2xl mb-5 font-semibold">Добавь нового сотрудника</h1>
      <form
        className="flex flex-col items-center gap-5"
        onSubmit={handleSubmit}
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

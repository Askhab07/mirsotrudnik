import React, { useContext, useState } from 'react';
import { UsersContext } from '../context/UsersContext';
import { ReportsContext } from '../context/ReportsContext';

const AddReport = () => {
  const { users } = useContext(UsersContext);
  const { handleAddReport, isLoading } = useContext(ReportsContext);
  const [login, setLogin] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [comment, setComment] = useState('');

  if (!users) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen text-3xl text-blue-800 font-bold animate-pulse">
        Загрузка...
      </div>
    );
  }

  const handleClick = (e) => {
    e.preventDefault();

    if (amount <= 0 || amount > 1000000) {
      alert('Сумма должна быть больше 0 и меньше 1 000 000');
      return;
    }

    const newReport = {
      login,
      category,
      amount: Number(amount),
      comment,
    };

    handleAddReport(newReport);
    setLogin('');
    setCategory('');
    setAmount('');
    setComment('');
  };

  return (
    <div className="min-h-screen px-5 pt-8 pb-24">
      <h1 className="text-xl font-bold mb-8">Добавить штраф или долг</h1>
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
          {users.map((user) => (
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
            Выберите категорию
          </option>
          <option value="Долг">Долг</option>
          <option value="Штраф">Штраф</option>
          <option value="Зарплата">Зарплата</option>
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

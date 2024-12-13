import React, { useContext, useState } from 'react';
import { UsersContext } from '../../context/UsersContext';
import { KassaContext } from '../../context/KassaContext';
import IsLoading from '../../components/IsLoading';

const AddKassa = () => {
  const { users } = useContext(UsersContext);
  const { handleAddKassa, isLoading } = useContext(KassaContext);
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

    const newKassa = {
      login,
      category,
      amount: Number(amount),
      comment,
    };

    handleAddKassa(newKassa);
    setLogin('');
    setCategory('');
    setAmount('');
    setComment('');
  };

  if (isLoading) {
    return (
      <IsLoading />
    );
  }

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
            <option key={user.user_id} value={user.name}>
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
          <option value="Отдал долг">Отдал долг</option>
          <option value="Премия">Премия</option>
          <option value="Личные">Личные</option>
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
          className="w-[335px] h-14 bg-blue-700 rounded-lg text-white text-xl font-bold"
          type="submit"
        >
          Добавить
        </button>
      </form>
    </div>
  );
};

export default AddKassa;

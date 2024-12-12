import React, { useContext, useState } from 'react';
import { UsersContext } from '../../context/UsersContext';
import IsLoading from '../../components/IsLoading';
import { ShiftsContext } from '../../context/ShiftsContext';

const AddExpense = () => {
  const { shifts, handleAddShifts, isLoading } = useContext(ShiftsContext);
  const { users } = useContext(UsersContext);
  const [login, setLogin] = useState('');
  const [shiftMarked, setShiftMarked] = useState(false);

  if (!shifts) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen text-3xl text-blue-800 font-bold animate-pulse">
        Загрузка...
      </div>
    );
  }

  const handleClick = (e) => {
    e.preventDefault();

    const newShifts = {
      login,
      shiftMarked,
    };

    handleAddShifts(newShifts);
    setLogin('');
    setShiftMarked()
  };

  if (isLoading) {
    return (
      <IsLoading />
    );
  }

  return (
    <div className="min-h-screen px-5 pt-8 pb-24">
      <h1 className="text-xl font-bold mb-8">Добавить смену</h1>
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
          name=""
          id=""
          className="w-[335px] h-14 rounded-lg pl-3 text-xl border-2 border-blue-400 outline-blue-600"
          required
          value={shiftMarked}
          onChange={(e) => setShiftMarked(e.target.value)}
        >
          <option value='' disabled>Пришел на работу?</option>
          <option value='yes' >Да</option>
          <option value='no' >Нет</option>
        </select>
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

export default AddExpense;

import axios from 'axios';
import { url } from '../../api/url';
import { useState } from 'react';

const AddExpense = () => {
  const [login, setLogin] = useState(''); // Логин пользователя
  const [amount, setAmount] = useState(''); // Сумма (duty или fine)
  const [comment, setComment] = useState(''); // Комментарий
  const [type, setType] = useState('duty'); // Тип: duty или fine
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Проверка данных
    if (!login || !amount || !type) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
        action: 'addExpense',
        login,
        date: new Date().toISOString().split('T')[0], // Текущая дата в формате YYYY-MM-DD
        [type]: amount, // Либо duty, либо fine
        [`${type}_comment`]: comment, // Комментарий для выбранного типа
      };

      // Отправляем запрос
      const response = await axios.post(url, payload, {
        headers: {
          'Content-Type': 'text/plain;charset=UTF-8',
        },
      });

      if (response.data.status === 'success') {
        setSuccess('Данные успешно добавлены.');
      } else {
        setError(response.data.message || 'Произошла ошибка.');
      }
    } catch (err) {
      setError('Ошибка при отправке данных: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-800 px-8 pt-8 pb-24">
      <h1 className="text-3xl font-bold text-white mb-8">Добавить штраф или долг</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Поле логина */}
        <label className="text-white">
          Логин:
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="w-full p-2 mt-1 rounded bg-gray-200"
            placeholder="Введите логин"
          />
        </label>

        {/* Выбор типа: duty или fine */}
        <label className="text-white">
          Тип:
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 mt-1 rounded bg-gray-200"
          >
            <option value="duty">Долг</option>
            <option value="fine">Штраф</option>
          </select>
        </label>

        {/* Поле суммы */}
        <label className="text-white">
          Сумма:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 mt-1 rounded bg-gray-200"
            placeholder="Введите сумму"
          />
        </label>

        {/* Поле комментария */}
        <label className="text-white">
          Комментарий:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 mt-1 rounded bg-gray-200"
            placeholder="Введите комментарий"
          ></textarea>
        </label>

        {/* Кнопка отправки */}
        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600"
          disabled={isLoading}
        >
          {isLoading ? 'Отправка...' : 'Добавить'}
        </button>
      </form>
    </div>
  );
};

export default AddExpense;

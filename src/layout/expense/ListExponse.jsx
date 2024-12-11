import React, { useState } from 'react';

const ListExpense = ({ expense }) => {
  const [isOpen, setIsOpen] = useState(null);

  if (!expense) {
    return <div className='animate-pulse'>Загрузка...</div>;
  }

  if (expense.length === 0) {
    return <div className="h-96 flex items-center justify-center font-semibold text-xl">Нет данных на сервере.</div>;
  }

  const handleOpen = (expense_id) => {
    setIsOpen((prev) => (prev === expense_id ? null : expense_id));
  };

  return (
    <ul className="flex flex-col gap-3 pb-16">
      {expense.map((r) => (
        <li
          key={r.expense_id}
          className="w-[335px] min-h-20 bg-blue-500 rounded-lg"
          onClick={() => handleOpen(r.expense_id)}
        >
          <div className="h-20 px-3 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">{r.login}</h2>
            <h2 className="flex flex-col items-end text-lg text-white">
              <span className='text-sm text-blue-200'>{r.category}</span>{r.amount}₽
            </h2>
          </div>
          {isOpen === r.expense_id && (
            <div className="w-[335px] h-20 px-3 flex flex-col justify-center bg-blue-700 rounded-b-lg">
              <h2 className="text-blue-400">
                {new Date(r.date).toLocaleDateString('ru-RU', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                }) + 'г'}
              </h2>
              <h2 className="text-white">{r.comment}</h2>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ListExpense;

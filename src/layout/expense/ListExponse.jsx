import {
  CurrencyDollarIcon,
  DocumentCurrencyDollarIcon,
} from '@heroicons/react/24/solid';
import { BanknotesIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';

const ListExpense = ({ expense }) => {
  const [isOpen, setIsOpen] = useState(null);

  if (!expense) {
    return <div className="animate-pulse">Загрузка...</div>;
  }

  if (expense.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center font-semibold text-xl">
        Нет данных на сервере.
      </div>
    );
  }

  const handleOpen = (expense_id) => {
    setIsOpen((prev) => (prev === expense_id ? null : expense_id));
  };

  return (
    <ul className="flex flex-col gap-3 pb-16">
      {expense.map((r) => (
        <li
          key={r.expense_id}
          className={`w-[335px] min-h-20 bg-white rounded-2xl transition-all ease-in-out duration-300 delay-100 ${
            isOpen === r.expense_id ? 'min-h-[160px] scale-[1.02] shadow-xl' : 'min-h-20'
          }`}
          onClick={() => handleOpen(r.expense_id)}
        >
          <div className="h-20 px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`flex justify-center items-center w-12 h-12 rounded-full ${
                  isOpen === r.expense_id && r.category === 'Зарплата' ? 'bg-green-100' : isOpen === r.expense_id && r.category === 'Долг' ? 'bg-amber-100' : isOpen === r.expense_id && r.category === 'Штраф' ? 'bg-red-100' : 'bg-gray-100'
                }`}
              >
                {r.category === 'Зарплата' ? (
                  <BanknotesIcon
                    className={`size-7 ${
                      isOpen === r.expense_id
                        ? 'text-green-600'
                        : 'text-gray-400'
                    }`}
                  />
                ) : r.category === 'Долг' ? (
                  <CurrencyDollarIcon className={`size-7 ${
                    isOpen === r.expense_id
                      ? 'text-amber-500'
                      : 'text-gray-400'
                  }`} />
                ) : (
                  <DocumentCurrencyDollarIcon className={`size-7 ${
                    isOpen === r.expense_id
                      ? 'text-red-500'
                      : 'text-gray-400'
                  }`} />
                )}
              </div>
              <h2
                className={`w-40 text-lg font-semibold ${
                  isOpen === r.expense_id ? '' : 'text-gray-400 '
                }`}
              >
                {r.login}
              </h2>
            </div>
            <div
              className={`flex flex-col items-end text-lg font-medium ${
                isOpen === r.expense_id ? '' : 'text-gray-400'
              }`}
            >
              <span
                className={`text-sm font-normal ${
                  isOpen === r.expense_id ? 'text-blue-400' : 'text-gray-400'
                }`}
              >
                {r.category}
              </span>
              {r.amount}₽
            </div>
          </div>
            <div
              className={`w-[335px] h-20 px-3 flex flex-col justify-center bg-blue-500 rounded-b-2xl transition-all duration-300 ease-in-out ${
                isOpen === r.expense_id
                  ? 'max-h-20 opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              <h2 className="text-blue-300">
                {new Date(r.date).toLocaleDateString('ru-RU', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                }) + 'г'}
              </h2>
              <h2 className="text-white">{r.comment}</h2>
            </div>
        </li>
      ))}
    </ul>
  );
};

export default ListExpense;

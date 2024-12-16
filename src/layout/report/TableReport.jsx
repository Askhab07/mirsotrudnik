import React from 'react';

const TableReport = ({ data, title }) => {
  return (
    <div className="w-[335px] bg-white shadow-lg rounded-3xl">
      <div className="flex justify-center py-3 font-bold text-xl rounded-t-3xl">
        {title}
      </div>
      <div className="flex justify-between font-bold bg-gray-100">
        <h2 className="w-[83px] h-14 flex justify-center items-center text-center">
          Имя
        </h2>
        <h2 className="w-[83px] h-14 flex justify-center items-center text-center">
          Смены
        </h2>
        <h2 className="w-[83px] h-14 flex justify-center items-center text-center">
          Кл-во
        </h2>
        <h2 className="w-[83px] h-14 flex justify-center items-center text-center">
          Зп
        </h2>
      </div>
      {data.map(
        (d) =>
          d.shift_marked === 'yes' && (
            <div
              key={d.shifts_id}
              className="flex justify-between"
            >
              <h2 className="w-[83px] h-14 pl-3 flex items-center text-center">
                {d.login}
              </h2>
              <h2 className="w-[83px] h-14 flex justify-center items-center text-center">
                {d.shift_marked === 'yes' ? 'Р' : ''}
              </h2>
              <h2 className="w-[83px] h-14 flex justify-center items-center text-center">
                {d.shift_marked === 'yes' && 1}
              </h2>
              <h2 className="w-[83px] h-14 flex justify-center items-center text-center">
                {d.amount} ₽
              </h2>
            </div>
          )
      )}
    </div>
  );
};

export default TableReport;

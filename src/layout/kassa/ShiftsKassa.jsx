import { useContext } from 'react';
import { ShiftsContext } from '../../context/ShiftsContext';
import { NoSymbolIcon, BriefcaseIcon } from '@heroicons/react/24/solid';

const ShiftsKassa = () => {
  const { shifts } = useContext(ShiftsContext);

  if (!shifts) {
    return <div className="animate-pulse">Загрузка...</div>;
  }

  if (shifts.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center font-semibold text-xl">
        Нет данных на сервере.
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3 pb-16">
      {shifts.map((shift) => (
        <li className="w-[335px] h-20 px-4 flex justify-between items-center bg-white rounded-xl">
          <div
            className={`flex justify-center items-center w-10 h-10 rounded-full ${
              shift.shift_marked === 'yes' ? 'bg-green-100' : 'bg-red-100'
            }`}
          >
            {shift.shift_marked === 'yes' ? (
              <BriefcaseIcon className="size-6 text-green-600" />
            ) : (
              <NoSymbolIcon className="size-6 text-red-500" />
            )}
          </div>
          <div>
            <h2 className="w-40 text-xl font-semibold">{shift.login}</h2>
            <h2 className='text-gray-400 text-sm'>{shift.shift_marked === 'yes' ? 'Рабочий' : 'Не рабочий'}</h2>
          </div>
          <h2 className='text-sm text-blue-400'>{`${new Date(shift.date).toLocaleDateString()}г`}</h2>
        </li>
      ))}
    </ul>
  );
};

export default ShiftsKassa;

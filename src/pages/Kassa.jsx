import {
  BriefcaseIcon,
  DocumentCurrencyDollarIcon,
} from '@heroicons/react/24/solid';
import { Outlet, NavLink, useLocation } from 'react-router-dom';

const Kassa = () => {
  const location = useLocation();

  const isShiftsPage = location.pathname === '/kassa/shifts';

  return (
    <div className="min-h-screen pt-8 pb-24 px-5 bg-gray-100">
      <h1 className="text-2xl text-whitetext-3xl mb-5 font-semibold">Касса</h1>
      <div className="w-[335px] h-10 flex justify-between bg-gray-300 rounded-xl text-gray-500 font-bold mb-3">
        <NavLink
          className={({ isActive }) =>
            `w-[167px] flex items-center justify-center rounded-l-xl ${
              isActive
                ? 'bg-white text-blue-500 border-[1px] border-gray-300'
                : ''
            }`
          }
          to="/kassa/shifts"
        >
          Смена
        </NavLink>
        <div className="w-[2px] bg-white" />
        <NavLink
          className={({ isActive }) =>
            `w-[167px] flex items-center justify-center rounded-r-xl ${
              isActive
                ? 'bg-white text-blue-500 border-[1px] border-gray-300'
                : ''
            }`
          }
          to="/kassa/transaction"
        >
          Касса
        </NavLink>
      </div>
      <Outlet />
      <div className="fixed bottom-24 right-5">
        {isShiftsPage ? (<NavLink
          className="w-14 h-14 bg-white shadow flex justify-center items-center text-xl rounded-xl"
          to="/kassa/shiftadd"
        >
          <BriefcaseIcon className="size-6 text-blue-600" />
        </NavLink>)
        :
        (<NavLink
          className="w-14 h-14 bg-white shadow flex justify-center items-center text-xl rounded-xl"
          to="/kassa/add"
        >
          <DocumentCurrencyDollarIcon className="size-6 text-blue-600" />
        </NavLink>)}
      </div>
    </div>
  );
};

export default Kassa;

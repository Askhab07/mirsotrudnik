import {
  CurrencyDollarIcon,
  ChartPieIcon,
  ClipboardDocumentListIcon,
  UserIcon,
  UsersIcon,
} from '@heroicons/react/24/solid';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="flex items-center min-w-full h-20 px-2 bg-white fixed bottom-0 shadow-[0_0px_10px_0px_rgba(0,0,0,0.5)] shadow-blue-300 text-white">
      <ul className="w-full flex justify-between">
        <li className="w-16">
          <NavLink
            className={({isActive}) => `flex flex-col items-center gap-1 text-[10px] ${[isActive ? 'text-blue-500' : 'text-black']}`}
            to="/expense"
          >
            <ClipboardDocumentListIcon className="size-6" />
            Расход
          </NavLink>
        </li>
        <li className="w-16">
          <NavLink
            className={({isActive}) => `flex flex-col items-center gap-1 text-[10px] ${[isActive ? 'text-blue-500' : 'text-black']}`}
            to="/chart"
          >
            <ChartPieIcon className="size-6" />
            Отчет
          </NavLink>
        </li>
        <li className="w-16">
          <NavLink
            className={({isActive}) => `flex flex-col items-center gap-1 text-[10px] ${[isActive ? 'text-blue-500' : 'text-black']}`}
            to="/chart"
          >
            <CurrencyDollarIcon className="size-6" />
            Касса
          </NavLink>
        </li>
        <li className="w-16">
          <NavLink
            className={({isActive}) => `flex flex-col items-center gap-1 text-[10px] ${[isActive ? 'text-blue-500' : 'text-black']}`}
            to="/users"
          >
            <UsersIcon className="size-6" />
            Сотрудники
          </NavLink>
        </li>
        <li className="w-16">
          <NavLink
            className={({isActive}) => `flex flex-col items-center gap-1 text-[10px] ${[isActive ? 'text-blue-500' : 'text-black']}`}
            to="/user"
          >
            <UserIcon className="size-6" />
            Профиль
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

import {
    CurrencyDollarIcon,
    ChartPieIcon,
    ClipboardDocumentListIcon,
    UserIcon,
    UsersIcon,
  } from '@heroicons/react/24/solid';
  import { Link } from 'react-router-dom';
  const NavBar = () => {
    return (
      <nav className="flex items-center min-w-full h-20 px-2 fixed bottom-0 rounded-t-xl bg-sky-700 text-white">
        <ul className="w-full flex justify-between">
          <li className="w-16">
            <Link
              className="flex flex-col items-center gap-1 text-[10px]"
              to="/mir/report"
            >
              <ClipboardDocumentListIcon className="size-6" />
              Расход
            </Link>
          </li>
          <li className="w-16">
            <Link
              className="flex flex-col items-center gap-1 text-[10px]"
              to="/mir/chart"
            >
              <ChartPieIcon className="size-6" />
              Отчет
            </Link>
          </li>
          <li className="w-16">
            <Link
              className="flex flex-col items-center gap-1 text-[10px]"
              to="/mir/chart"
            >
              <CurrencyDollarIcon className="size-6" />
              Касса
            </Link>
          </li>
          <li className="w-16">
            <Link
              className="flex flex-col items-center gap-1 text-[10px]"
              to="/mir/users"
            >
              <UsersIcon className="size-6" />
              Сотрудники
            </Link>
          </li>
          <li className="w-16">
            <Link
              className="flex flex-col items-center gap-1 text-[10px]"
              to="/mir/user"
            >
              <UserIcon className="size-6" />
              Профиль
            </Link>
          </li>
        </ul>
      </nav>
    );
  };
  
  export default NavBar;
  
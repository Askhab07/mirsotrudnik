import { ArrowLeftStartOnRectangleIcon, BellIcon, LifebuoyIcon, UserCircleIcon, UserIcon } from '@heroicons/react/24/solid';
import React, { useContext } from 'react';
import { UsersContext } from '../context/UsersContext';

const Profile = () => {
  const { users } = useContext(UsersContext);
  return (
    <div className="min-h-screen pt-8 pb-24 px-5">
      <h1 className="text-2xl text-whitetext-3xl mb-5 font-semibold">
        Профиль
      </h1>
      <div className="flex flex-col items-center gap-10">
        <div className="w-40 h-40 flex justify-center items-center bg-blue-700 rounded-full">
          <UserIcon className="size-24 text-blue-400" />
        </div>
        <h2 className="text-3xl font-semibold font-sans">{users[3].name}</h2>
        <div className="w-full flex flex-col gap-2">
          <div className="w-full h-16 px-5 flex gap-5 items-center bg-blue-200 rounded-3xl text-blue-800 text-xl">
            <UserCircleIcon className='size-6' />
            My Account
          </div>
          <div className="w-full h-16 px-5 flex gap-5 items-center bg-blue-200 rounded-3xl text-blue-800 text-xl">
            <BellIcon className='size-6' />
            Notification
          </div>
          <div className="w-full h-16 px-5 flex gap-5 items-center bg-blue-200 rounded-3xl text-blue-800 text-xl">
            <LifebuoyIcon className='size-6' />
            Help Center
          </div>
          <div className="w-full h-16 px-5 flex gap-5 items-center bg-blue-200 rounded-3xl text-red-800 text-xl">
            <ArrowLeftStartOnRectangleIcon className='size-6' />
            Выйти
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

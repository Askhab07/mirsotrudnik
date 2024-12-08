import { Link } from 'react-router-dom';
import ListUsers from '../components/ListUsers';
import { UserPlusIcon } from '@heroicons/react/24/solid';

const Users = () => {
    return (
        <div className="min-h-screen pt-8 px-5">
          <h1 className='text-2xl text-whitetext-3xl mb-5 font-semibold'>Сотрудники</h1>
            <ListUsers />
            <Link className='w-14 h-14 flex justify-center items-center text-xl text-white bg-blue-600 rounded-lg font-semibold fixed right-5 bottom-24' to='/users/add'>
              <UserPlusIcon className='size-6'/>
            </Link>
          </div>
    );
};

export default Users;
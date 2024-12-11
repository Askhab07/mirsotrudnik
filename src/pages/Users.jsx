import { Link } from 'react-router-dom';
import ListUsers from '../components/ListUsers';
import { UserPlusIcon } from '@heroicons/react/24/solid';

const Users = () => {
    return (
        <div className="min-h-screen pt-8 px-5">
          <h1 className='text-2xl text-whitetext-3xl mb-5 font-semibold'>Сотрудники</h1>
            <ListUsers />
            <div className='flex justify-between fixed bottom-24 right-5'>
            <Link className='w-14 h-14 bg-white shadow flex justify-center items-center text-xl rounded-xl' to='/users/add'>
              <UserPlusIcon className='size-6 text-blue-600'/>
            </Link>
            </div>
          </div>
    );
};

export default Users;
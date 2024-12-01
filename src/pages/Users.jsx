import { Link } from 'react-router-dom';
import ListUsers from '../components/users/ListUsers';

const Users = () => {
    return (
        <div className="min-h-screen bg-sky-800 pt-8 px-7">
          <h1 className='text-2xl text-whitetext-3xl text-white mb-5 font-semibold'>Сотрудники</h1>
            <ListUsers />
            <Link className='w-80 h-10 flex justify-center items-center text-xl text-white bg-sky-600 rounded-lg font-semibold fixed bottom-24' to='/mir/users/add'>
              <button>Добавить сотрудника</button>
            </Link>
          </div>
    );
};

export default Users;
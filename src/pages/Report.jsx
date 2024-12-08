import { Link } from 'react-router-dom';
import ListReport from '../components/ListReport';
import SearchReport from '../components/SearchExpense';
import { DocumentPlusIcon } from '@heroicons/react/24/solid';

const Report = () => {
    return (
        <div className='min-h-scree pt-8 pb-24 px-5'>
            <h1 className='text-2xl text-whitetext-3xl mb-5 font-semibold'>Отчеты</h1>
            <SearchReport />
            <ListReport/>
            <div className='flex justify-between fixed bottom-24 right-5'>
            <Link className='w-14 h-14 bg-blue-600 flex justify-center items-center text-xl rounded-lg' to='/report/add'>
              <DocumentPlusIcon className='size-6 text-white'/>
            </Link>
            </div>
        </div>
    );
};

export default Report;
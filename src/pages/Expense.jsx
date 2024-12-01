import { Link } from 'react-router-dom';
import ListReport from '../components/report/ListExpense';
import SearchReport from '../components/report/SearchExpense';

const Expense = () => {
    return (
        <div className='min-h-screen bg-sky-800 pt-8 px-5'>
            <h1 className='text-2xl text-whitetext-3xl text-white mb-5 font-semibold'>Отчеты</h1>
            <SearchReport />
            <ListReport/>
            <div className='w-[335px] flex justify-between fixed bottom-24'>
            <Link className='w-[335px] h-14 flex justify-center items-center text-xl text-white bg-sky-600 rounded-lg' to='/mir/expense/add'>
              <button>Добавить расход</button>
            </Link>
            </div>
        </div>
    );
};

export default Expense;
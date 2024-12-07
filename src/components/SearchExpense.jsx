import {MagnifyingGlassCircleIcon} from '@heroicons/react/24/solid';

const SearchExpense = () => {
    return (
        <div className='flex justify-between items-center w-[335px] h-10 border-2 border-blue-200 rounded-lg px-3 text-sky-800 mb-5'>
            <input className='w-64 bg-inherit outline-none placeholder:text-blue-600' type='text' placeholder='Поиск...'/>
            <MagnifyingGlassCircleIcon className='size-6 text-blue-500'/>
        </div>
    );
};

export default SearchExpense;
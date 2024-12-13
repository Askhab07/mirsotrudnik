import {
  BriefcaseIcon,
  DocumentCurrencyDollarIcon,
} from '@heroicons/react/24/solid';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ListKassa from '../layout/kassa/ListKassa';
import { KassaContext } from '../context/KassaContext.js';

const Kassa = () => {
  const { kassa } = useContext(KassaContext);
  return (
    <div className="min-h-screen pt-8 pb-24 px-5">
      <h1 className="text-2xl text-whitetext-3xl mb-5 font-semibold">Касса</h1>
      <ListKassa kassa={kassa} />
      <div className="flex flex-col gap-5 justify-between fixed bottom-24 right-5">
        <Link
          className="w-14 h-14 bg-white shadow flex justify-center items-center text-xl rounded-xl"
          to="/kassa/shifts"
        >
          <BriefcaseIcon className="size-6 text-blue-600" />
        </Link>
        <Link
          className="w-14 h-14 bg-white shadow flex justify-center items-center text-xl rounded-xl"
          to="/kassa/add"
        >
          <DocumentCurrencyDollarIcon className="size-6 text-blue-600" />
        </Link>
      </div>
    </div>
  );
};

export default Kassa;

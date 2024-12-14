import React from 'react';
import { UsersProvider } from './UsersContext';
import { ExpenseProvider } from './ExpenseContext';
import { KassaProvider } from './KassaContext';
import { ShiftsProvider } from './ShiftsContext';

const AppProviders = ({ children }) => {
  return (
    <UsersProvider>
      <ExpenseProvider>
       <ShiftsProvider>
       <KassaProvider>
        {children}
       </KassaProvider>
       </ShiftsProvider>
      </ExpenseProvider>
    </UsersProvider>
  );
};

export default AppProviders;

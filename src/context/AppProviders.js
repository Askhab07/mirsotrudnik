import React from 'react';
import { UsersProvider } from './UsersContext';
import { ExpenseProvider } from './ExpenseContext';

const AppProviders = ({ children }) => {
    return (
        <UsersProvider>
            <ExpenseProvider>
                {children}
            </ExpenseProvider>
        </UsersProvider>
    );
};

export default AppProviders;

import React from 'react';
import { UsersProvider } from './UsersContext';
import { ReportsProvider } from './ReportsContext';

const AppProviders = ({ children }) => {
    return (
        <UsersProvider>
            <ReportsProvider>
                {children}
            </ReportsProvider>
        </UsersProvider>
    );
};

export default AppProviders;

import React from 'react';

const TableReport = () => {
    // Пример данных отчета
    const reportData = [
        {
            name: 'Иван Иванов',
            shift: true, // Пришел на работу
            dailySalary: 2000,
            expenses: [
                { category: 'Штраф', amount: 500 },
                { category: 'Долг', amount: 100 },
            ],
            cashMovements: [
                { category: 'Свои деньги', amount: 300 },
                { category: 'Отдал долг', amount: 100 },
                { category: 'Премия', amount: 200 },
            ],
        },
        {
            name: 'Анна Смирнова',
            shift: false, // Не пришла на работу
            dailySalary: 2500,
            expenses: [
                { category: 'Штраф', amount: 700 },
            ],
            cashMovements: [
                { category: 'Свои деньги', amount: 500 },
                { category: 'Премия', amount: 300 },
            ],
        },
    ];

    // Рассчитываем общий расход и остаток зарплаты
    const calculateTotals = (person) => {
        const totalExpenses = person.expenses.reduce((sum, exp) => sum + exp.amount, 0);
        const totalCash = person.cashMovements.reduce((sum, mov) => sum + mov.amount, 0);
        const salaryLeft = person.dailySalary - totalExpenses + totalCash;
        return { totalExpenses, salaryLeft };
    };

    return (
        <div className='w-full max-w-[800px] mx-auto p-5 bg-white shadow rounded-3xl space-y-6'>
            <h2 className='text-center text-lg font-bold mb-4'>Отчет о работе</h2>

            {/* Первая таблица */}
            <table className='w-full border-collapse'>
                <thead>
                    <tr className='bg-gray-100'>
                        <th className='border p-2'>Имя</th>
                        <th className='border p-2'>Смена</th>
                        <th className='border p-2'>Дневная зарплата</th>
                    </tr>
                </thead>
                <tbody>
                    {reportData.map((item, index) => (
                        <tr key={index} className='text-center'>
                            <td className='border p-2'>{item.name}</td>
                            <td className='border p-2'>{item.shift ? 'Да' : 'Нет'}</td>
                            <td className='border p-2'>{item.shift ? item.dailySalary: 0} ₽</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Вторая таблица */}
            <table className='w-full border-collapse'>
                <thead>
                    <tr className='bg-gray-100'>
                        <th className='border p-2'>Имя</th>
                        <th className='border p-2'>Категория</th>
                        <th className='border p-2'>Расход</th>
                    </tr>
                </thead>
                <tbody>
                    {reportData.map((item) =>
                        item.expenses.map((exp, index) => (
                            <tr key={index} className='text-center'>
                                <td className='border p-2'>{item.name}</td>
                                <td className='border p-2'>{exp.category}</td>
                                <td className='border p-2'>{exp.amount} ₽</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Третья таблица */}
            <table className='w-full border-collapse'>
                <thead>
                    <tr className='bg-gray-100'>
                        <th className='border p-2'>Имя</th>
                        <th className='border p-2'>Категория</th>
                        <th className='border p-2'>Касса</th>
                    </tr>
                </thead>
                <tbody>
                    {reportData.map((item) =>
                        item.cashMovements.map((mov, index) => (
                            <tr key={index} className='text-center'>
                                <td className='border p-2'>{item.name}</td>
                                <td className='border p-2'>{mov.category}</td>
                                <td className='border p-2'>{mov.amount} ₽</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Четвертая таблица */}
            <table className='w-full border-collapse'>
                <thead>
                    <tr className='bg-gray-100'>
                        <th className='border p-2'>Имя</th>
                        <th className='border p-2'>Общий расход</th>
                        <th className='border p-2'>Остаток зарплаты</th>
                    </tr>
                </thead>
                <tbody>
                    {reportData.map((item, index) => {
                        const { totalExpenses, salaryLeft } = calculateTotals(item);
                        return (
                            <tr key={index} className='text-center'>
                                <td className='border p-2'>{item.name}</td>
                                <td className='border p-2'>{totalExpenses} ₽</td>
                                <td className='border p-2'>{salaryLeft} ₽</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TableReport;

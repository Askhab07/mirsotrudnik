import { useEffect, useState } from 'react';

const FilterReport = () => {
    const [data, setData] = useState([]); // Начальное состояние как пустой массив

    useEffect(() => {
        const report = localStorage.getItem('report');
        if (report) {
            try {
                const parsedReport = JSON.parse(report); // Парсим данные из localStorage
                setData(parsedReport); // Устанавливаем состояние
            } catch (error) {
                console.error('Failed to parse report data:', error);
            }
        }
    }, []); // Зависимость - пустой массив, чтобы эффект выполнялся только один раз при монтировании

    return (
        <div className="flex justify-between my-3">
            {/* Dropdown for selecting user */}
            <select className="font-bold">
                <option value="">Все</option>
                {data.map(f => (
                    <option key={f.report_id} value={f.login}>
                        {f.login}
                    </option>
                ))}
            </select>

            {/* Date filter */}
            <input 
                type="date" 
                className="font-bold"
                onChange={(e) => {
                    const selectedDate = e.target.value;
                    console.log('Selected Date:', selectedDate); // Обработка выбранной даты
                }}
            />
        </div>
    );
};

export default FilterReport;

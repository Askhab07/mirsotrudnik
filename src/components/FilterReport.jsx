const FilterReport = ({
  selectedLogin,
  onLoginChange,
  dateRange,
  onDateChange,
  report
}) => {

  const uniqLogins = [...new Set(report.map((r) => r.login))]

  return (
    <div className="h-14 flex justify-between items-center my-3">
      <select
        className="w-40 h-full font-semibold text-sm outline-none px-2 py-1 border-2 bg-white text-blue-600 border-blue-200 appearance-none rounded-lg"
        value={selectedLogin}
        onChange={(e) => onLoginChange(e.target.value)}
      >
        <option value="">Все</option>
        {uniqLogins.map((login, index) => (
          <option key={index} value={login}>
            {login}
          </option>
        ))}
      </select>

      <div className="w-40 h-full flex flex-col justify-center px-2 py-1 items-end gap-1">
        <label htmlFor="" className='flex items-center gap-1 font-semibold text-sm text-blue-600'>
          От
        <input
          type="date"
          className="w-full font-semibold text-sm outline-none border-2 rounded-lg border-blue-200 bg-white"
          value={dateRange.start}
          onChange={(e) =>
            onDateChange({ ...dateRange, start: e.target.value })
          }
        />
        </label>
        <label htmlFor="" className='flex items-center gap-1 font-semibold text-sm text-blue-600'>
          До
        <input
          type="date"
          className="w-full font-semibold text-sm outline-none border-2 rounded-lg border-blue-200 bg-white"
          value={dateRange.end}
          onChange={(e) => onDateChange({ ...dateRange, end: e.target.value })}
        />
        </label>
      </div>
    </div>
  );
};

export default FilterReport;

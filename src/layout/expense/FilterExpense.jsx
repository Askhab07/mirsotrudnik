const FilterExpense = ({
  selectedLogin,
  onLoginChange,
  dateRange,
  onDateChange,
  expense
}) => {

  const uniqLogins = [...new Set(expense.map((r) => r.login))]

  return (
    <div className="h-14 flex justify-between items-center my-5">
  <select
    className="w-40 h-full font-semibold text-sm outline-none px-4 py-2 border-2 bg-white text-blue-600 border-blue-200 appearance-none rounded-lg shadow-sm hover:border-blue-400 focus:ring-2 focus:ring-blue-300 transition-all duration-300"
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

  <div className="w-52 h-full flex flex-col justify-center py-1 items-end gap-2">
    <label htmlFor="start" className='flex items-center gap-2 font-semibold text-sm text-blue-600'>
      От
      <input
        id="start"
        type="date"
        className="w-full font-semibold text-sm outline-none border-2 rounded-lg border-blue-200 bg-white text-blue-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 transition-all duration-300"
        value={dateRange.start}
        onChange={(e) => onDateChange({ ...dateRange, start: e.target.value })}
      />
    </label>
    <label htmlFor="end" className='flex items-center gap-2 font-semibold text-sm text-blue-600'>
      До
      <input
        id="end"
        type="date"
        className="w-full font-semibold text-sm outline-none border-2 rounded-lg border-blue-200 bg-white text-blue-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 transition-all duration-300"
        value={dateRange.end}
        onChange={(e) => onDateChange({ ...dateRange, end: e.target.value })}
      />
    </label>
  </div>
</div>

  );
};

export default FilterExpense;

const FilterExpense = ({
  selectedLogin,
  onLoginChange,
  dateRange,
  onDateChange,
  expense,
}) => {
  const uniqLogins = [...new Set(expense.map((r) => r.login))];
  return (
    <div className="h-16 flex justify-between items-center my-5 bg-blue-500 rounded-xl">
      <select
        className="w-40 h-full font-semibold text-sm outline-none px-4 py-2 bg-inherit text-white border-blue-200 appearance-none rounded-l-xl shadow-sm focus:bg-blue-700 transition-all duration-300"
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
        <label
          htmlFor="start"
          className="flex items-center gap-2 font-semibold text-sm text-white"
        >
          От
          <input
            id="start"
            type="date"
            className="w-full font-semibold text-sm outline-none bg-inherit text-white"
            value={dateRange.start}
            onChange={(e) =>
              onDateChange({ ...dateRange, start: e.target.value })
            }
          />
        </label>
        <label
          htmlFor="end"
          className="flex items-center gap-2 font-semibold text-sm text-white"
        >
          До
          <input
            id="end"
            type="date"
            className="w-full font-semibold text-sm outline-none bg-inherit text-white"
            value={dateRange.end}
            onChange={(e) =>
              onDateChange({ ...dateRange, end: e.target.value })
            }
          />
        </label>
      </div>
    </div>
  );
};

export default FilterExpense;

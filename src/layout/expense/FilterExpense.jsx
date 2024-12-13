import SelectMenus from '../../components/SelectMenus';

const FilterExpense = ({
  selectedLogin,
  onLoginChange,
  dateRange,
  onDateChange,
  expense,
}) => {
  const uniqLogins = [...new Set(expense.map((r) => r.login))];

  return (
    <div className="flex flex-col gap-2 justify-between items-center rounded-xl">
      <SelectMenus
        uniqLogins={uniqLogins}
        selectedLogin={selectedLogin}
        onLoginChange={onLoginChange}
      />

      <div className="flex justify-between gap-2 w-[300px] h-9 cursor-default grid-cols-1 rounded-md bg-white text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline">
        <label
          htmlFor="start"
          className="pl-4 w-36 flex gap-1 items-center font-semibold text-sm"
        >
          От
          <input
            id="start"
            type="date"
            className="font-semibold text-sm outline-none bg-inherit text-blue-500"
            value={dateRange.start || ''}
            onChange={(e) =>
              onDateChange({ ...dateRange, start: e.target.value })
            }
          />
        </label>
        <label
          htmlFor="end"
          className="w-36 flex gap-1 items-center font-semibold text-sm"
        >
          До
          <input
            id="end"
            type="date"
            className="font-semibold text-sm outline-none bg-inherit text-blue-500"
            value={dateRange.end || ''}
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

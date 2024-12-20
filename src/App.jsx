import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import NavBar from './layout/NavBar';
import Users from './pages/Users';
import Expense from './pages/Expense';
import AddUsers from './components/AddUsers';
import AddExpense from './layout/expense/AddExpense';
import Report from './pages/Report';
import Kassa from './pages/Kassa';
import ShiftsKassa from './layout/kassa/ShiftsKassa';
import ListKassa from './layout/kassa/ListKassa';
import AddShiftsKassa from './layout/kassa/AddShiftsKassa';
import AddKassa from './layout/kassa/AddKassa';

function App() {
  const hiddenPaths = ['/auth'];

  const location = useLocation();
  const shouldHideBottomNav = hiddenPaths.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/expense" element={<Expense />} />
        <Route path="/expense/add" element={<AddExpense />} />
        <Route path="/report" element={<Report />} />
        <Route path="/kassa/*" element={<Kassa />}>
          <Route index element={<Navigate to="shifts" replace />} />
          <Route path="shifts" element={<ShiftsKassa />} />
          <Route path="transaction" element={<ListKassa />} />
        </Route>
        <Route path="/kassa/shiftadd" element={<AddShiftsKassa />} />
        <Route path="/kassa/add" element={<AddKassa />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/add" element={<AddUsers />} />
        <Route path="*" element={<Navigate to="/expense" replace />} />
      </Routes>
      {!shouldHideBottomNav && <NavBar />}
    </>
  );
}

export default App;

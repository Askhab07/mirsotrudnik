import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import NavBar from './layout/NavBar';
import Users from './pages/Users';
import Expense from './pages/Expense';
import AddUsers from './components/AddUsers';
import AddExpense from './layout/expense/AddExpense';
import Report from './pages/Report';

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
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<Users />} />
        <Route path="/users/add" element={<AddUsers />} />
        <Route path="*" element={<Navigate to="/expense" replace/>} />
      </Routes>
      {!shouldHideBottomNav && <NavBar />}
    </>
  );
}

export default App;
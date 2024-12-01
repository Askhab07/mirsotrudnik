import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Users from './pages/Users';
import Expense from './pages/Expense';
import AddUsers from './components/users/AddUsers';
import AddExpense from './components/report/AddExpense';

function App() {
  const hiddenPaths = [
    '/auth',
  ];
  const shouldHideBottomNav = hiddenPaths.includes(location.pathname);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/mir/expense" element={<Expense />} />
          <Route path="/mir/expense/add" element={<AddExpense />} />
          <Route path="/mir/users" element={<Users />} />
          <Route path="/mir/users/:id" element={<Users />} />
          <Route path="/mir/users/add" element={<AddUsers />} />
          <Route path="*" element={<Expense />} />
        </Routes>
        {!shouldHideBottomNav && <NavBar />}
      </Router>
    </>
  );
}

export default App;

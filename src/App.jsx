import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Users from './pages/Users';
import Report from './pages/Report';
import AddUsers from './components/AddUsers';
import AddReport from './components/AddReport';

function App() {
  const hiddenPaths = ['/auth'];

  const location = useLocation();
  const shouldHideBottomNav = hiddenPaths.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/report" element={<Report />} />
        <Route path="/report/add" element={<AddReport />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<Users />} />
        <Route path="/users/add" element={<AddUsers />} />
        <Route path="*" element={<Report />} />
      </Routes>
      {!shouldHideBottomNav && <NavBar />}
    </>
  );
}

export default App;

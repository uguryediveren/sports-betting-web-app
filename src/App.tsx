import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import HomePage from './pages/HomePage';
import type { AppDispatch } from './redux/store';

import { useAuth } from './contexts/auth-provider';
import { fetchUserBetsAction } from './redux/betSlice';
import { fetchSports } from './redux/sportsSlice';
// import ProfilePage from './pages/ProfilePage';

function App() {
  const { user } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchSports());

    if (user) {
      dispatch(fetchUserBetsAction(user.uid));
    }
  }, [dispatch, user]);

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

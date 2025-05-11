import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import HomePage from './pages/HomePage';
import type { AppDispatch } from './redux/store';

import { fetchSports } from './redux/sportsSlice';
// import ProfilePage from './pages/ProfilePage';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchSports());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        {/* <Route path='/profile' element={<ProfilePage />} /> */}
        {/* <Route path='/events/:id' element={<EventDetailsPage />} /> */}
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

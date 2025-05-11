import { Route, Routes } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import EventDetailsPage from './pages/EventDetailsPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/events/:id' element={<EventDetailsPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

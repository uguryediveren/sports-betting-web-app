import { Header } from '../components/Header';
import { Profile } from '../components/Profile';

export default function ProfilePage() {
  return (
    <main className='min-h-screen bg-background'>
      <Header />
      <div className='container mx-auto px-4 py-6'>
        <Profile />
      </div>
    </main>
  );
}

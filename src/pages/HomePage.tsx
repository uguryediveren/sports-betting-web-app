import { BetBulletin } from '../components/BetBulletin';
import { Header } from '../components/Header';
import { SideCart } from '../components/SideCart';

export default function HomePage() {
  return (
    <main className='min-h-screen bg-background'>
      <Header />
      <div className='container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6'>
        <div className='flex-1'>
          <BetBulletin />
        </div>
        <div className='w-full lg:w-80'>
          <SideCart />
        </div>
      </div>
    </main>
  );
}

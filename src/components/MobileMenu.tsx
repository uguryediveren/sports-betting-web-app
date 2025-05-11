import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Search } from './Search';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='md:hidden'>
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='flex flex-col'>
        <div className='px-2 py-4'>
          <Search />
        </div>
        <nav className='grid gap-2 px-2'>
          <Link to='/' className='flex items-center py-2 text-lg font-semibold'>
            Ana Sayfa
          </Link>
          <Link to='/live' className='flex items-center py-2 text-lg font-semibold'>
            Canlı Etkinlikler
          </Link>
          <Link to='/upcoming' className='flex items-center py-2 text-lg font-semibold'>
            Yaklaşan
          </Link>
          <Link to='/popular' className='flex items-center py-2 text-lg font-semibold'>
            Popüler
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

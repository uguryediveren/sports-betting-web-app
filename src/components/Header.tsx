import { Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { signIn, signOut, useAuth } from '../contexts/auth-provider';
import { useMobile } from '../hooks/use-mobile';
import { useToast } from '../hooks/use-toast';
import { MobileMenu } from './MobileMenu';
import { Search } from './Search';
import { ThemeToggle } from './ThemeToggle';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function Header() {
  const { user, isAuthAvailable } = useAuth();
  const isMobile = useMobile();
  const { toast } = useToast();

  const handleSignIn = async () => {
    if (!isAuthAvailable) {
      toast({
        title: 'Authentication unavailable',
        description: 'Firebase is not properly configured. Demo mode is active.',
        variant: 'destructive',
      });
      return;
    }

    await signIn();
  };

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 items-center justify-center mx-auto'>
        <div className='flex items-center gap-2'>
          {isMobile && <MobileMenu />}
          <Link to='/' className='flex items-center gap-2'>
            <Trophy className='h-6 w-6 text-primary' />
            <span className='font-bold text-xl hidden sm:inline-block'>BetMaster</span>
          </Link>
        </div>

        <div className='hidden md:flex flex-1 mx-6'>
          <Search />
        </div>

        <div className='flex items-center gap-4'>
          <ThemeToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
                  <Avatar className='h-8 w-8'>
                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                    <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem asChild>
                  <Link to='/profile'>Profil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to='/profile?tab=history'>Bahislerim</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>Çıkış Yap</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={handleSignIn}>{isAuthAvailable ? 'Giriş Yap' : 'Demo Mod'}</Button>
          )}
        </div>
      </div>
    </header>
  );
}

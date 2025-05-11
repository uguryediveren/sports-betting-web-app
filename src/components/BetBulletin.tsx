import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBasketball, fetchFootball, fetchTennis, fetchVolleyball } from '../redux/eventsSlice';
import type { AppDispatch, RootState } from '../redux/store';
import { EventCard } from './EventCard';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function BetBulletin() {
  const dispatch = useDispatch<AppDispatch>();
  const { events, footballStatus, error, basketballStatus, tennisStatus, volleyballStatus } =
    useSelector((state: RootState) => state.events);
  const sports = useSelector((state: RootState) => state.sports.sports);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Soccer');

  const activeSportKeys = sports
    .filter((sport: any) => sport.group === activeTab)
    .slice(0, 28)
    .map((sport: any) => sport.key);

  useEffect(() => {
    if (activeSportKeys.length === 0) {
      return;
    }

    switch (activeTab) {
      case 'Soccer':
        if (footballStatus === 'idle') {
          dispatch(fetchFootball(activeSportKeys));
        }
        break;
      case 'Basketball':
        if (basketballStatus === 'idle') {
          dispatch(fetchBasketball(activeSportKeys));
        }
        break;
      case 'Tennis':
        if (tennisStatus === 'idle') {
          dispatch(fetchTennis(activeSportKeys));
        }
        break;
      case 'Volleyball':
        if (volleyballStatus === 'idle') {
          dispatch(fetchVolleyball(activeSportKeys));
        }
        break;
      default:
        break;
    }
  }, [activeTab, dispatch, footballStatus, basketballStatus, tennisStatus, activeSportKeys]);

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      (event.home_team && event.home_team.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (event.away_team && event.away_team.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (event.sport_title && event.sport_title.toLowerCase().includes(searchTerm.toLowerCase()));

    // if (activeTab === 'all') return matchesSearch;
    return activeSportKeys.includes(event.sport_key) && matchesSearch;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (status === 'loading') {
    return <div className='flex justify-center p-8'>Etkinlikler yükleniyor...</div>;
  }

  if (status === 'failed') {
    return <div className='flex justify-center p-8 text-red-500'>Hata: {error}</div>;
  }

  return (
    <div className='space-y-4'>
      <div className='flex flex-col sm:flex-row gap-4 items-center'>
        <div className='relative w-full'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            type='search'
            placeholder='Etkinlik, takım veya lig ara...'
            className='w-full pl-8'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant='outline' onClick={() => setSearchTerm('')} className='sm:w-auto w-full'>
          Temizle
        </Button>
      </div>

      <Tabs defaultValue='Soccer' onValueChange={setActiveTab}>
        <TabsList className='grid grid-cols-4 mb-2'>
          <TabsTrigger value='Soccer'>Futbol</TabsTrigger>
          <TabsTrigger value='Basketball'>Basketbol</TabsTrigger>
          <TabsTrigger value='Volleyball'>Voleybol</TabsTrigger>
          <TabsTrigger value='Tennis'>Tenis</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className='mt-4'>
          {filteredEvents.length > 0 ? (
            <motion.div className='grid gap-4' variants={container} initial='hidden' animate='show'>
              {filteredEvents.map((event) => (
                <motion.div key={event.id} variants={item}>
                  <EventCard event={event} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className='text-center py-8'>
              Etkinlik bulunamadı. Arama kriterlerinizi değiştirin.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../redux/eventsSlice';
import type { AppDispatch, RootState } from '../redux/store';
import { EventCard } from './EventCard';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function BetBulletin() {
  const dispatch = useDispatch<AppDispatch>();
  const { events, status, error } = useSelector((state: RootState) => state.events);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.home_team.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.away_team.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.league.name.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && event.sport_key === activeTab;
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

      <Tabs defaultValue='all' onValueChange={setActiveTab}>
        <TabsList className='grid grid-cols-4 mb-2'>
          <TabsTrigger value='all'>Tümü</TabsTrigger>
          <TabsTrigger value='soccer'>Futbol</TabsTrigger>
          <TabsTrigger value='basketball'>Basketbol</TabsTrigger>
          <TabsTrigger value='tennis'>Tenis</TabsTrigger>
        </TabsList>

        <TabsList className='grid grid-cols-4'>
          <TabsTrigger value='volleyball'>Voleybol</TabsTrigger>
          <TabsTrigger value='handball'>Hentbol</TabsTrigger>
          <TabsTrigger value='ice-hockey'>Buz Hokeyi</TabsTrigger>
          <TabsTrigger value='other'>Diğer</TabsTrigger>
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

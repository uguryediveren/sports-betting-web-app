'use client';

import { useAuth } from '@/contexts/auth-provider';
import { getOdds2 } from '@/lib/api';
import { saveBetToFirebase } from '@/redux/betSlice';
import { Calendar, Clock } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logAnalyticsEvent } from '../lib/firebase';
import { cn, formatDate, formatTime } from '../lib/utils';
import type { Event } from '../types/events';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { toast } from './ui/use-toast';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const ref = useRef<HTMLElement>(null);
  const [odds, setOdds] = useState({});
  const [oddsStatus, setOddsStatus] = useState('idle');
  const selections = useSelector((state: any) => state.bet.selections);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          if (oddsStatus === 'idle') {
            setOddsStatus('loading');

            try {
              const res = await getOdds2(event.sport_key, event.id);
              setOdds(res);
              setOddsStatus('loaded');
            } catch (err) {
              console.log(err);
              setOddsStatus('error');
            }
          }
        }
      });
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [oddsStatus, setOddsStatus, event.sport_key, event.id]);

  const handleAddToBet = (odd: { name: string; price: number }) => {
    console.log('Adding to bet:', odd);
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to add a selection',
        variant: 'destructive',
      });
      return;
    }

    const bet = {
      eventId: event.id,
      eventName: `${event.home_team} vs ${event.away_team}`,
      selection: odd.name,
      odds: odd.price,
    };

    dispatch(saveBetToFirebase({ userId: user?.uid, bet }));

    logAnalyticsEvent('add_to_cart', {
      event_id: event.id,
      event_name: `${event.home_team} vs ${event.away_team}`,
      selection: odd.name,
      odds: odd.price,
    });
  };

  return (
    <Card ref={ref}>
      <CardHeader className='pb-2'>
        <div className='flex justify-between items-start'>
          <div>
            <Badge variant='outline' className='mb-2'>
              {event.sport_title}
            </Badge>
            <CardTitle className='text-lg'>
              {event.home_team} vs {event.away_team}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className='flex items-center gap-4 text-sm text-muted-foreground mb-4'>
          <div className='flex items-center'>
            <Calendar className='mr-1 h-4 w-4' />
            {formatDate(event.commence_time)}
          </div>
          <div className='flex items-center'>
            <Clock className='mr-1 h-4 w-4' />
            {formatTime(event.commence_time)}
          </div>
        </div>

        {oddsStatus === 'loading' && 'Loading'}
        {oddsStatus === 'error' && 'Error'}

        {oddsStatus === 'loaded' && (
          <div className='grid grid-cols-3 gap-2'>
            {/* <pre>{JSON.stringify(odds, null, 4)}</pre> */}
            {odds.bookmakers.length > 0 &&
              odds.bookmakers[0].markets[0].outcomes.slice(0, 3).map((odd) => (
                <Button
                  key={odds.bookmakers[0].markets[0].outcomes.indexOf(odd)}
                  variant='outline'
                  className={cn('flex flex-col h-auto py-2', {
                    'bg-primary text-white hover:bg-primary hover:text-white': selections.some(
                      (selection: any) =>
                        selection.eventId === event.id && selection.selection === odd.name,
                    ),
                  })}
                  onClick={() => handleAddToBet(odd)}
                >
                  <span className='text-xs'>{odd.name}</span>
                  <span className='font-bold'>{odd.price.toFixed(2)}</span>
                </Button>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

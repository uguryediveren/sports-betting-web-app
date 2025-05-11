'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, ChevronDown, ChevronUp, Clock, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logAnalyticsEvent } from '../lib/firebase';
import { formatDate, formatTime } from '../lib/utils';
import { addToBet } from '../redux/betSlice';
import type { Event, Odd } from '../types/events';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();

  const handleAddToBet = (odd: Odd) => {
    dispatch(
      addToBet({
        eventId: event.id,
        eventName: `${event.home_team} vs ${event.away_team}`,
        selection: odd.name,
        odds: odd.value,
        type: odd.type,
      }),
    );

    logAnalyticsEvent('add_to_cart', {
      event_id: event.id,
      event_name: `${event.home_team} vs ${event.away_team}`,
      selection: odd.name,
      odds: odd.value,
    });
  };

  const handleViewDetails = () => {
    setExpanded(!expanded);

    if (!expanded) {
      logAnalyticsEvent('match_detail_view', {
        event_id: event.id,
        event_name: `${event.home_team} vs ${event.away_team}`,
      });
    }
  };

  return (
    <Card>
      <CardHeader className='pb-2'>
        <div className='flex justify-between items-start'>
          <div>
            <Badge variant='outline' className='mb-2'>
              {event.league.name}
            </Badge>
            <CardTitle className='text-lg'>
              {event.home_team} vs {event.away_team}
            </CardTitle>
          </div>
          <div className='flex gap-2'>
            <Button variant='ghost' size='sm' asChild>
              <Link to={`/events/${event.id}`}>
                <ExternalLink size={16} />
              </Link>
            </Button>
            <Button variant='ghost' size='sm' onClick={handleViewDetails}>
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Button>
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

        <div className='grid grid-cols-3 gap-2'>
          {event.odds.slice(0, 3).map((odd) => (
            <Button
              key={odd.id}
              variant='outline'
              className='flex flex-col h-auto py-2'
              onClick={() => handleAddToBet(odd)}
            >
              <span className='text-xs text-muted-foreground'>{odd.name}</span>
              <span className='font-bold'>{odd.value.toFixed(2)}</span>
            </Button>
          ))}
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='overflow-hidden'
            >
              <div className='mt-4 pt-4 border-t'>
                <h4 className='font-medium mb-2'>Tüm Oranlar</h4>
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                  {event.odds.map((odd) => (
                    <Button
                      key={odd.id}
                      variant='outline'
                      className='flex flex-col h-auto py-2'
                      onClick={() => handleAddToBet(odd)}
                    >
                      <span className='text-xs text-muted-foreground'>{odd.name}</span>
                      <span className='font-bold'>{odd.value.toFixed(2)}</span>
                    </Button>
                  ))}
                </div>
                <div className='mt-4 text-center'>
                  <Button asChild variant='link'>
                    <Link to={`/events/${event.id}`}>
                      Tüm Bahis Seçeneklerini Gör <ExternalLink className='ml-1 h-3 w-3' />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

'use client';

import { useState } from 'react';
import { mockBetHistory } from '../lib/mock-data';
import { formatDate, formatTime } from '../lib/utils';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

function BetStatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'won':
      return <Badge className='bg-green-500'>Kazanıldı</Badge>;
    case 'lost':
      return <Badge variant='destructive'>Kaybedildi</Badge>;
    case 'pending':
      return (
        <Badge variant='outline' className='text-yellow-600 border-yellow-600'>
          Beklemede
        </Badge>
      );
    default:
      return null;
  }
}

export function BetHistory() {
  const [filter, setFilter] = useState('all');

  const filteredBets = mockBetHistory.filter((bet) => {
    if (filter === 'all') return true;
    return bet.status === filter;
  });

  return (
    <div className='space-y-4'>
      <Tabs defaultValue='all' onValueChange={setFilter}>
        <TabsList className='grid grid-cols-4'>
          <TabsTrigger value='all'>Tümü</TabsTrigger>
          <TabsTrigger value='won'>Kazanılan</TabsTrigger>
          <TabsTrigger value='lost'>Kaybedilen</TabsTrigger>
          <TabsTrigger value='pending'>Bekleyen</TabsTrigger>
        </TabsList>
      </Tabs>

      {filteredBets.length > 0 ? (
        <div className='space-y-4'>
          {filteredBets.map((bet) => (
            <Card key={bet.id}>
              <CardContent className='p-4'>
                <div className='flex justify-between items-start mb-2'>
                  <div>
                    <p className='font-medium'>
                      {formatDate(bet.date)} - {formatTime(bet.date)}
                    </p>
                    <p className='text-sm text-muted-foreground'>Kupon #{bet.id.slice(0, 8)}</p>
                  </div>
                  <BetStatusBadge status={bet.status} />
                </div>

                <div className='mt-4 space-y-2'>
                  {bet.selections.map((selection, index) => (
                    <div key={index} className='text-sm border-b pb-2 last:border-0'>
                      <div className='flex justify-between'>
                        <span>{selection.event}</span>
                        <span className='font-medium'>{selection.odds.toFixed(2)}</span>
                      </div>
                      <p className='text-muted-foreground'>{selection.selection}</p>
                    </div>
                  ))}
                </div>

                <div className='mt-4 pt-2 border-t flex justify-between items-center'>
                  <div>
                    <p className='text-sm'>
                      Toplam Oran: <span className='font-medium'>{bet.totalOdds.toFixed(2)}</span>
                    </p>
                    <p className='text-sm'>
                      Bahis: <span className='font-medium'>${bet.stake.toFixed(2)}</span>
                    </p>
                  </div>
                  <div className='text-right'>
                    <p className='text-sm'>Potansiyel Kazanç:</p>
                    <p className='font-bold text-primary'>
                      ${(bet.stake * bet.totalOdds).toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className='text-center py-8 text-muted-foreground'>
          Bu filtreye uygun bahis bulunamadı.
        </div>
      )}
    </div>
  );
}

// 'use client';

// import { ArrowLeft, Calendar, Clock } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// // import { fetchEventDetails } from '../lib/api';
// import { logAnalyticsEvent } from '../lib/firebase';
// import { formatDate, formatTime } from '../lib/utils';
// import { addToBet } from '../redux/betSlice';
// import type { Event, Odd } from '../types/events';
// import { SideCart } from './SideCart';
// import { Badge } from './ui/badge';
// import { Button } from './ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

// interface EventDetailsProps {
//   eventId: string;
// }

// export function EventDetails({ eventId }: EventDetailsProps) {
//   const [event, setEvent] = useState<Event | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function loadEventDetails() {
//       try {
//         setLoading(true);
//         const eventData = await fetchEventDetails(eventId);
//         setEvent(eventData);

//         if (eventData) {
//           logAnalyticsEvent('event_detail_view', {
//             event_id: eventData.id,
//             event_name: `${eventData.home_team} vs ${eventData.away_team}`,
//             sport: eventData.sport_key,
//             league: eventData.league.name,
//           });
//         }
//       } catch (err) {
//         setError('Etkinlik detayları yüklenirken bir hata oluştu.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadEventDetails();
//   }, [eventId]);

//   const handleAddToBet = (odd: Odd) => {
//     if (!event) return;

//     dispatch(
//       addToBet({
//         eventId: event.id,
//         eventName: `${event.home_team} vs ${event.away_team}`,
//         selection: odd.name,
//         odds: odd.value,
//         type: odd.type,
//       }),
//     );

//     logAnalyticsEvent('add_to_cart', {
//       event_id: event.id,
//       event_name: `${event.home_team} vs ${event.away_team}`,
//       selection: odd.name,
//       odds: odd.value,
//     });
//   };

//   if (loading) {
//     return <div className='flex justify-center p-8'>Etkinlik detayları yükleniyor...</div>;
//   }

//   if (error || !event) {
//     return (
//       <div className='flex flex-col items-center p-8'>
//         <p className='text-red-500 mb-4'>{error || 'Etkinlik bulunamadı.'}</p>
//         <Button onClick={() => navigate(-1)} variant='outline'>
//           <ArrowLeft className='mr-2 h-4 w-4' /> Geri Dön
//         </Button>
//       </div>
//     );
//   }

//   // Bahis türlerine göre gruplandırma
//   const mainMarkets = event.odds.filter((odd) => ['1', 'X', '2'].includes(odd.type));
//   const overUnderMarkets = event.odds.filter((odd) => ['over', 'under'].includes(odd.type));
//   const specialMarkets = event.odds.filter(
//     (odd) => !['1', 'X', '2', 'over', 'under'].includes(odd.type),
//   );

//   return (
//     <div className='flex flex-col lg:flex-row gap-6'>
//       <div className='flex-1'>
//         <Button onClick={() => navigate(-1)} variant='outline' className='mb-4'>
//           <ArrowLeft className='mr-2 h-4 w-4' /> Geri Dön
//         </Button>

//         <Card>
//           <CardHeader>
//             <div className='flex flex-col gap-2'>
//               <Badge variant='outline' className='w-fit'>
//                 {event.league.name} - {event.league.country}
//               </Badge>
//               <CardTitle className='text-2xl'>
//                 {event.home_team} vs {event.away_team}
//               </CardTitle>
//               <div className='flex items-center gap-4 text-sm text-muted-foreground'>
//                 <div className='flex items-center'>
//                   <Calendar className='mr-1 h-4 w-4' />
//                   {formatDate(event.commence_time)}
//                 </div>
//                 <div className='flex items-center'>
//                   <Clock className='mr-1 h-4 w-4' />
//                   {formatTime(event.commence_time)}
//                 </div>
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <Tabs defaultValue='main'>
//               <TabsList className='grid grid-cols-3 mb-4'>
//                 <TabsTrigger value='main'>Ana Bahisler</TabsTrigger>
//                 <TabsTrigger value='overunder'>Alt/Üst</TabsTrigger>
//                 <TabsTrigger value='special'>Özel Bahisler</TabsTrigger>
//               </TabsList>

//               <TabsContent value='main'>
//                 <div className='grid grid-cols-3 gap-3'>
//                   {mainMarkets.map((odd) => (
//                     <Button
//                       key={odd.id}
//                       variant='outline'
//                       className='flex flex-col h-auto py-3'
//                       onClick={() => handleAddToBet(odd)}
//                     >
//                       <span className='text-xs text-muted-foreground'>{odd.name}</span>
//                       <span className='font-bold text-lg'>{odd.value.toFixed(2)}</span>
//                     </Button>
//                   ))}
//                 </div>
//               </TabsContent>

//               <TabsContent value='overunder'>
//                 <div className='grid grid-cols-2 gap-3'>
//                   {overUnderMarkets.map((odd) => (
//                     <Button
//                       key={odd.id}
//                       variant='outline'
//                       className='flex flex-col h-auto py-3'
//                       onClick={() => handleAddToBet(odd)}
//                     >
//                       <span className='text-xs text-muted-foreground'>{odd.name}</span>
//                       <span className='font-bold text-lg'>{odd.value.toFixed(2)}</span>
//                     </Button>
//                   ))}
//                 </div>
//               </TabsContent>

//               <TabsContent value='special'>
//                 <div className='grid grid-cols-2 gap-3'>
//                   {specialMarkets.map((odd) => (
//                     <Button
//                       key={odd.id}
//                       variant='outline'
//                       className='flex flex-col h-auto py-3'
//                       onClick={() => handleAddToBet(odd)}
//                     >
//                       <span className='text-xs text-muted-foreground'>{odd.name}</span>
//                       <span className='font-bold text-lg'>{odd.value.toFixed(2)}</span>
//                     </Button>
//                   ))}
//                 </div>
//               </TabsContent>
//             </Tabs>
//           </CardContent>
//         </Card>
//       </div>

//       <div className='w-full lg:w-80'>
//         <SideCart />
//       </div>
//     </div>
//   );
// }

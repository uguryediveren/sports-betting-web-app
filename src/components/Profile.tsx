// 'use client';

// import { useEffect } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { useAuth } from '../contexts/auth-provider';
// import { AccountSettings } from './AccountSettings';
// import { BetHistory } from './BetHistory';
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

// export function Profile() {
//   const { user, isAuthAvailable } = useAuth();
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const tabParam = searchParams.get('tab');

//   useEffect(() => {
//     if (!user && isAuthAvailable) {
//       navigate('/');
//     }
//   }, [user, isAuthAvailable, navigate]);

//   if (!user && isAuthAvailable) {
//     return null; // Will redirect in useEffect
//   }

//   return (
//     <div className='max-w-4xl mx-auto'>
//       <Card>
//         <CardHeader className='flex flex-col sm:flex-row items-start sm:items-center gap-4'>
//           <Avatar className='h-20 w-20'>
//             <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || 'User'} />
//             <AvatarFallback className='text-2xl'>
//               {user?.displayName?.charAt(0) || 'U'}
//             </AvatarFallback>
//           </Avatar>
//           <div>
//             <CardTitle className='text-2xl'>{user?.displayName || 'Demo User'}</CardTitle>
//             <CardDescription>{user?.email || 'demo@example.com'}</CardDescription>
//             {!isAuthAvailable && (
//               <p className='text-sm mt-2 text-yellow-600 dark:text-yellow-400'>
//                 Demo Mode Active - Firebase not configured
//               </p>
//             )}
//           </div>
//         </CardHeader>
//         <CardContent>
//           <Tabs defaultValue={tabParam || 'history'} className='mt-4'>
//             <TabsList className='grid w-full grid-cols-2'>
//               <TabsTrigger value='history'>Bahis Geçmişi</TabsTrigger>
//               <TabsTrigger value='settings'>Hesap Ayarları</TabsTrigger>
//             </TabsList>
//             <TabsContent value='history' className='mt-4'>
//               <BetHistory />
//             </TabsContent>
//             <TabsContent value='settings' className='mt-4'>
//               <AccountSettings />
//             </TabsContent>
//           </Tabs>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

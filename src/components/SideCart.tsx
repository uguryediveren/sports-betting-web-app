import { AnimatePresence, motion } from 'framer-motion';
import { Trash2, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../contexts/auth-provider';
import { useToast } from '../hooks/use-toast';
import { logAnalyticsEvent } from '../lib/firebase';
import { clearBets, placeBet, removeFromBet } from '../redux/betSlice';
import type { RootState } from '../redux/store';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { use } from 'react';

export function SideCart() {
  const { selections, totalOdds } = useSelector((state: RootState) => state.bet);
  const dispatch = useDispatch<typeof import('../redux/store').store.dispatch>();
  const { toast } = useToast();
  const { user, isAuthAvailable } = useAuth();

  const handleRemoveSelection = (eventId: string) => {
    if (!user && isAuthAvailable) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to remove a selection',
        variant: 'destructive',
      });
      return;
    }

    if (user) {
      dispatch(
        removeFromBet({
          userId: user?.uid,
          eventId,
        }),
      );
    }

    logAnalyticsEvent('remove_from_cart', {
      selection_id: eventId,
    });
  };

  const handlePlaceBet = () => {
    if (!user && isAuthAvailable) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to place a bet',
        variant: 'destructive',
      });
      return;
    }

    if (selections.length === 0) {
      toast({
        title: 'Empty bet slip',
        description: 'Please add selections to your bet slip',
        variant: 'destructive',
      });
      return;
    }

    if (user) {
      dispatch(placeBet(user.uid));
    }

    logAnalyticsEvent('place_bet', {
      selections_count: selections.length,
      total_odds: totalOdds,
      stake: 10,
      potential_win: 10 * totalOdds,
    });
  };

  const handleClearBet = () => {
    if (!user && isAuthAvailable) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to clear your bet slip',
        variant: 'destructive',
      });
      return;
    }

    if (user) {
      dispatch(clearBets(user.uid));
    }
  };

  return (
    <Card className='sticky top-20'>
      <CardHeader>
        <div className='flex justify-between items-center'>
          <CardTitle>Bet Slip</CardTitle>
          <Badge count={selections.length} />
        </div>
      </CardHeader>
      <CardContent>
        {selections.length > 0 ? (
          <>
            <ScrollArea className='h-[300px] pr-4'>
              <AnimatePresence>
                {selections.map((selection) => (
                  <motion.div
                    key={selection.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className='mb-3 pb-3 border-b last:border-0'>
                      <div className='flex justify-between items-start'>
                        <div className='flex-1'>
                          <p className='font-medium text-sm'>{selection.eventName}</p>
                          <p className='text-xs text-muted-foreground'>{selection.selection}</p>
                        </div>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-6 w-6'
                          onClick={() => handleRemoveSelection(selection.eventId)}
                        >
                          <X className='h-4 w-4' />
                        </Button>
                      </div>
                      <div className='mt-1 text-sm font-bold'>{selection.odds.toFixed(2)}</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </ScrollArea>

            <div className='mt-4 pt-4 border-t'>
              <div className='flex justify-between mb-2'>
                <span className='text-sm'>Total Odds:</span>
                <span className='font-bold'>{totalOdds.toFixed(2)}</span>
              </div>
              <div className='flex justify-between mb-4'>
                <span className='text-sm'>Stake:</span>
                <span className='font-bold'>$10.00</span>
              </div>
              <div className='flex justify-between text-primary'>
                <span className='text-sm font-medium'>Potential Win:</span>
                <span className='font-bold'>${(10 * totalOdds).toFixed(2)}</span>
              </div>
            </div>
          </>
        ) : (
          <div className='py-8 text-center text-muted-foreground'>
            Your bet slip is empty. Add selections to place a bet.
          </div>
        )}
      </CardContent>
      <CardFooter className='flex flex-col gap-2'>
        <Button className='w-full' onClick={handlePlaceBet} disabled={selections.length === 0}>
          Place Bet {!isAuthAvailable && '(Demo)'}
        </Button>
        {selections.length > 0 && (
          <Button variant='outline' className='w-full' onClick={handleClearBet}>
            <Trash2 className='mr-2 h-4 w-4' /> Clear Slip
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

function Badge({ count }: { count: number }) {
  if (count === 0) return null;

  return (
    <div className='bg-primary text-primary-foreground rounded-full h-6 min-w-6 flex items-center justify-center text-xs font-medium px-2'>
      {count}
    </div>
  );
}

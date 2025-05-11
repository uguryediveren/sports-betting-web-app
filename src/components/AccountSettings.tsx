'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '../contexts/auth-provider';
import { useToast } from '../hooks/use-toast';
import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';

const formSchema = z.object({
  displayName: z.string().min(2, {
    message: 'İsim en az 2 karakter olmalıdır.',
  }),
  email: z.string().email({
    message: 'Geçerli bir e-posta adresi giriniz.',
  }),
  currency: z.string(),
  notifications: z.boolean(),
});

export function AccountSettings() {
  const { user, isAuthAvailable } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: user?.displayName || 'Demo User',
      email: user?.email || 'demo@example.com',
      currency: 'TRY',
      notifications: true,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: 'Ayarlar güncellendi',
      description: 'Hesap ayarlarınız başarıyla güncellendi.',
    });
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='displayName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>İsim</FormLabel>
              <FormControl>
                <Input placeholder='İsminiz' {...field} disabled={!isAuthAvailable} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-posta</FormLabel>
              <FormControl>
                <Input placeholder='E-posta adresiniz' {...field} disabled={!isAuthAvailable} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='currency'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Para Birimi</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Para birimi seçin' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='TRY'>Türk Lirası (₺)</SelectItem>
                  <SelectItem value='USD'>Amerikan Doları ($)</SelectItem>
                  <SelectItem value='EUR'>Euro (€)</SelectItem>
                  <SelectItem value='GBP'>İngiliz Sterlini (£)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='notifications'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
              <div className='space-y-0.5'>
                <FormLabel className='text-base'>Bildirimler</FormLabel>
                <FormDescription>
                  Özel teklifler ve promosyonlar hakkında bildirim almak istiyorum.
                </FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full'>
          Değişiklikleri Kaydet
        </Button>
      </form>
    </Form>
  );
}

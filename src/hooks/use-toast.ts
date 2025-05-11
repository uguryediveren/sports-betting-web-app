import type React from 'react';
// Bu dosya shadcn/ui'nin toast bileşeni için gereklidir
// Vite projenizde shadcn/ui kurulumunu tamamladıktan sonra
// bu dosyayı oluşturabilirsiniz

import type { Toast, ToastActionElement } from '../components/ui/toast';
import { useToast as useToastOriginal } from '../components/ui/use-toast';

export type ToastActionProps = React.ComponentPropsWithoutRef<typeof Toast> & {
  altText?: string;
  action?: ToastActionElement;
  description?: React.ReactNode;
  title?: React.ReactNode;
};

export { useToastOriginal as useToast };

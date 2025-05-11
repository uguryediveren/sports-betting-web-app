import type React from 'react';

import {
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  type User,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { initializeFirebase, isFirebaseAvailable } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthAvailable: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthAvailable: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthAvailable, setIsAuthAvailable] = useState(false);

  useEffect(() => {
    try {
      const app = initializeFirebase();

      if (!app) {
        setLoading(false);
        setIsAuthAvailable(false);
        return;
      }

      setIsAuthAvailable(true);
      const auth = getAuth(app);

      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          setUser(user);
          setLoading(false);
        },
        (error) => {
          console.error('Auth state change error:', error);
          setLoading(false);
        },
      );

      return () => unsubscribe();
    } catch (error) {
      console.error('Error setting up auth:', error);
      setLoading(false);
      setIsAuthAvailable(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAuthAvailable }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export async function signIn() {
  if (!isFirebaseAvailable()) {
    return { success: false, error: 'Firebase not configured' };
  }

  try {
    const app = initializeFirebase();
    if (!app) {
      return { success: false, error: 'Firebase not initialized' };
    }

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider);
    return { success: true };
  } catch (error) {
    console.error('Error signing in:', error);
    return { success: false, error };
  }
}

export async function signOut() {
  if (!isFirebaseAvailable()) {
    return { success: false, error: 'Firebase not configured' };
  }

  try {
    const app = initializeFirebase();
    if (!app) {
      return { success: false, error: 'Firebase not initialized' };
    }

    const auth = getAuth(app);
    await firebaseSignOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Error signing out:', error);
    return { success: false, error };
  }
}

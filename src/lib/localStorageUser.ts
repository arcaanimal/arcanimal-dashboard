// lib/localStorageUser.ts
import { User } from '@/types';

export function getUserFromLocalStorage(): User | null {
  if (typeof window === 'undefined') return null;

  const user = localStorage.getItem('user');
  if (!user) return null;

  try {
    return JSON.parse(user) as User;
  } catch {
    return null;
  }
}

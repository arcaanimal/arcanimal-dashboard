// lib/getAuthHeader.ts
import { getUserFromLocalStorage } from '@/lib/localStorageUser';

export async function getAuthHeader() {
  const user = getUserFromLocalStorage();

  if (!user || !user.email) {
    throw new Error('Usuário não autenticado');
  }

  return {
    Authorization: user.email,
  };
}

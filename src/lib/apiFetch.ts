// lib/apiFetch.ts
import { getAuthHeader } from '@/lib/getAuthHeader';

export async function apiFetch(input: RequestInfo, init?: RequestInit) {
  const headers = await getAuthHeader();

  const finalInit: RequestInit = {
    ...init,
    headers: {
      ...(init?.headers || {}),
      ...headers,
    },
  };

  const res = await fetch(input, finalInit);

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || 'Erro na requisição');
  }

  return res.json();
}

import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/apiFetch';

interface ShelterCountResponse {
  total: number;
}

// Função que faz o fetch
async function fetchShelterCount(): Promise<ShelterCountResponse> {
  const data = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shelters/count`);
  return data;
}

// Hook
export function useShelters() {
  return useQuery({
    queryKey: ['shelters-count'],
    queryFn: fetchShelterCount,
  });
}

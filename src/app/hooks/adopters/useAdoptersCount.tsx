import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/apiFetch';

interface ShelterCountResponse {
  total: number;
}

async function fetchAdoptersCount(): Promise<ShelterCountResponse> {
  const data = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/adopters/count`);
  return data;
}

// Hook
export function useAdoptersCount() {
  return useQuery({
    queryKey: ['adopters-count'],
    queryFn: fetchAdoptersCount,
  });
}

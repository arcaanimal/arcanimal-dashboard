import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/apiFetch'; 

interface AdminCountResponse {
  count: number;
}

async function fetchAdminsCount(): Promise<AdminCountResponse> {
  return apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admins/count`);
}

export function useGetAdminsCount() {
  return useQuery<AdminCountResponse>({
    queryKey: ['admins-count'],
    queryFn: fetchAdminsCount,
  });
}

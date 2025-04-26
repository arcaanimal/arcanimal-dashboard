import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/apiFetch'; 

interface ContactCountResponse {
  count: number;
}

async function fetchContactDoneCount(): Promise<ContactCountResponse> {
    return apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contacts`);
  }

export function useContactDoneDashboard() {
  return useQuery<ContactCountResponse>({
    queryKey: ['contacts-count'],
    queryFn: fetchContactDoneCount,
  });
}

// hooks/admins/useAdmins.ts
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/apiFetch';

interface Admin {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface AdminsResponse {
  admins: Admin[];
}

async function fetchAdmins(): Promise<AdminsResponse> {
  return apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admins`);
}

export function useAdmins() {
  return useQuery<AdminsResponse>({
    queryKey: ['admins'],
    queryFn: fetchAdmins,
  });
}

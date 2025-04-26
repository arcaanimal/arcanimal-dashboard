// hooks/admins/useAvailableAdmins.ts
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/apiFetch';

interface Admin {
  id: string;      // id da fila
  userId: string;  // id do usuário (novo campo)
  name: string;
  email: string;
  createdAt: string;
}

interface AvailableAdminsResponse {
  admins: Admin[];
}

async function fetchAvailableAdmins(): Promise<AvailableAdminsResponse> {
  return apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admins/avaliable`);
}

export function useAvailableAdmins() {
  return useQuery<AvailableAdminsResponse>({
    queryKey: ['available-admins'],
    queryFn: fetchAvailableAdmins,
  });
}

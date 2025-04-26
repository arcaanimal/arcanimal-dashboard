import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/apiFetch';

interface CheckMasterResponse {
  success: boolean;
}

async function fetchCheckMaster() {
  return apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/check_master`);
}

export function useCheckMasterAuthorization() {
  return useQuery<CheckMasterResponse>({
    queryKey: ['check-master-authorization'],
    queryFn: fetchCheckMaster,
    retry: false, // não faz retry automático
  });
}

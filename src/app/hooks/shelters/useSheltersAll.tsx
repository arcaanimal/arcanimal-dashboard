import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/apiFetch';

export interface Shelter {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  whatsapp: string;
  address: string;
  capacity: number;
  status: string;
  is_contact_done: boolean;
  admin_contacter: string;
}

interface ShelterCountResponse {
  total: number;
  shelters: Shelter[];
}

// Função que faz o fetch
async function fetchShelterCount(): Promise<ShelterCountResponse> {
  const shelters: Shelter[] = await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shelters`);
  
  return {
    total: shelters.length,
    shelters,
  };
}

// Hook
export function useSheltersAll() {
  return useQuery({
    queryKey: ['shelters-count'],
    queryFn: fetchShelterCount,
  });
}

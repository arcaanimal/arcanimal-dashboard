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
  message: string;
  createdAt: string;
}

// Função para buscar shelter por ID
const fetchShelterById = async (id: string): Promise<Shelter> => {
  return apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shelters/${id}`);
};

// Hook para usar no front
export const useShelterById = (id: string) => {
  return useQuery({
    queryKey: ['shelter', id],
    queryFn: () => fetchShelterById(id),
    enabled: !!id, // Só ativa a query se o ID existir
  });
};

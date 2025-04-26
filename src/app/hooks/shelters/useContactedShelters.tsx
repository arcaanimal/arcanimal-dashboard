// app/hooks/shelters/useContactedShelters.ts
import { useQuery } from "@tanstack/react-query";
import { getAuthHeader } from '@/lib/getAuthHeader'; // importa o helper certo

export interface ContactedShelter {
  id: string;
  name: string;
  city: string;
  phone: string;
  capacity: number;
  admin_contacter: string;
  createdAt: string;
}

interface ContactedSheltersResponse {
  shelters: ContactedShelter[];
}

async function fetchContactedShelters(): Promise<ContactedSheltersResponse> {
  const headers = await getAuthHeader(); // pega o Authorization com email

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shelters/contact_done`, {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar abrigos contatados");
  }

  return res.json(); // Tipo { shelters: ContactedShelter[] }
}

export function useContactedShelters() {
  return useQuery({
    queryKey: ["contacted-shelters"],
    queryFn: fetchContactedShelters,
  });
}

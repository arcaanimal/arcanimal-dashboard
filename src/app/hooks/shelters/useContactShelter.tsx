import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '@/lib/apiFetch';

async function contactShelter(id: string, admin_contacter: string): Promise<void> {
  await apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shelters/${id}/contact`, {
    method: 'POST',
    body: JSON.stringify({ admin_contacter }), // agora sim!
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function useContactShelter() {
  return useMutation({
    mutationFn: ({ id, admin_contacter }: { id: string; admin_contacter: string }) =>
      contactShelter(id, admin_contacter),
  });
}

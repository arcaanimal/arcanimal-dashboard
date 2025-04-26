// hooks/useRegisterActivity.ts
import { useMutation } from '@tanstack/react-query';

interface ActivityPayload {
  contact: string;
}

export function useRegisterActivity() {
  return useMutation({
    mutationFn: async (payload: ActivityPayload) => {
      const res = await fetch('/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Erro ao registrar atividade');
      }

      return res.json();
    },
  });
}

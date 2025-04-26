// src/app/hooks/admins/useApproveAdmin.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/lib/apiFetch';

interface ApproveAdminPayload {
  userId: string;
  queueId: string;
  name: string;
  email: string;
}

export function useApproveAdmin() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (admin: ApproveAdminPayload) =>
      apiFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admins/approve`, {
        method: "POST",
        body: JSON.stringify(admin),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins-available"] });
      queryClient.invalidateQueries({ queryKey: ["admins"] }); // Atualiza admins também
      alert("Admin aprovado com sucesso.");
    },
  });

  return { approveAdmin: mutate, isPending, isSuccess };
}

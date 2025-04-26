// hooks/admins/useDeleteAdmin.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";

async function deleteAdmin(adminId: string) {
  // Faz o DELETE usando o apiFetch
  return apiFetch(`/api/admins/delete/${adminId}`, {
    method: "DELETE",
  });
}

export function useDeleteAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAdmin,
    onSuccess: () => {
      // Após deletar, refaz a busca dos admins
      queryClient.invalidateQueries({ queryKey: ['admins'] });
      alert('Administrador deletado com sucesso!');
    },
    onError: (error: any) => {
      console.error(error);
      alert(error?.message || 'Erro desconhecido ao deletar administrador.');
    },
  });
}

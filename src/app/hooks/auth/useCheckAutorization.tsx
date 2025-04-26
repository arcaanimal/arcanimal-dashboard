import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";

interface CheckAuthorizationResponse {
  success: boolean;
}

async function fetchAuthorization(): Promise<CheckAuthorizationResponse> {
  return apiFetch("/api/auth/check");
}

export function useCheckAuthorization() {
  return useQuery<CheckAuthorizationResponse>({
    queryKey: ["authorization-check"],
    queryFn: fetchAuthorization,
    retry: false, // não fica tentando de novo se falhar
  });
}

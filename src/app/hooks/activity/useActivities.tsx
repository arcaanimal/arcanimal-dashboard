import { useQuery } from "@tanstack/react-query";

export interface Activity {
  id: string;
  contact: string;
  admin: string;
  adopters: number;
  shelter: number;
  createdAt?: string;
  updatedAt?: string;
}

async function fetchActivities(): Promise<Activity> {
  const res = await fetch("/api/activities");
  if (!res.ok) {
    throw new Error("Erro ao buscar atividades");
  }
  return res.json();
}

export function useActivities() {
  return useQuery<Activity>({
    queryKey: ["activities"],
    queryFn: fetchActivities,
    select: (data) => data ?? null, // <-- garante que nunca será undefined

  });
}

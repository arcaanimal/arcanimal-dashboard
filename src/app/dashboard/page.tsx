"use client";

import { useAuth } from "@/app/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Charts from "../components/features/dashboard/components/Charts";
import Layout from "../components/shared/layout";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="">
      <Layout>
        <Charts />
      </Layout>
    </div>
  );
}

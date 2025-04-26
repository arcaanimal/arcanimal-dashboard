"use client";

import React from "react";
import Layout from "@/app/components/shared/layout/index";
import AdminCard from "@/app/components/features/admins/components/AdminCard";
import AvailableAdminsTable from "@/app/components/features/admins/components/AvailableAdminsTable";
import { useAdmins } from "../hooks/admins/useAdmins";
import { useAvailableAdmins } from "../hooks/admins/useAvailableAdmins";
import { useDeleteAdmin } from "../hooks/admins/useDeleteAdmin";
import { useCheckMasterAuthorization } from "@/app/hooks/auth/useCheckMasterAuthorization"; // Importa o hook

const AdminsPage: React.FC = () => {
  const { data: authData, isLoading: authLoading, error: authError } = useCheckMasterAuthorization();
  const { data, isLoading, error } = useAdmins();
  const { data: availableAdmins } = useAvailableAdmins();
  const { mutate: deleteAdmin } = useDeleteAdmin();

  const handleDeleteAdmin = (adminId: string) => {
    if (!confirm('Tem certeza que deseja deletar este administrador?')) return;
    deleteAdmin(adminId);
  };

  if (authLoading) return <p>Verificando permissões...</p>;

  if (authError || !authData?.success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Acesso Negado</h2>
        <p className="text-gray-600">Desculpe, você não tem permissão para acessar esta página.</p>
      </div>
    );
  }

  if (isLoading) return <p>Carregando administradores...</p>;
  if (error) return <p>Erro ao carregar administradores.</p>;

  return (
    <Layout>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Administradores</h2>

      {data?.admins?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {data.admins.map((admin) => (
            <AdminCard key={admin.id} admin={admin} onDelete={handleDeleteAdmin} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mb-12">Nenhum administrador cadastrado ainda.</p>
      )}

      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Administradores Disponíveis para Cadastro
      </h3>

      <AvailableAdminsTable admins={availableAdmins?.admins || []} />
    </Layout>
  );
};

export default AdminsPage;

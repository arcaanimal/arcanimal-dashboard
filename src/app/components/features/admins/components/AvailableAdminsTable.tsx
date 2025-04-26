// components/features/admins/components/AvailableAdminsTable.tsx
import React from "react";
import { useApproveAdmin } from "@/app/hooks/admins/useApproveAdmin";

interface AvailableAdmin {
  id: string;         // ID da fila (admins_queue)
  userId: string;     // ID do usuário real
  name: string;
  email: string;
  createdAt: string;
}

interface AvailableAdminsTableProps {
  admins: AvailableAdmin[];
}

const AvailableAdminsTable: React.FC<AvailableAdminsTableProps> = ({ admins }) => {
  const { approveAdmin } = useApproveAdmin();

  const handleApprove = (admin: AvailableAdmin) => {
    if (!confirm(`Deseja aprovar o admin ${admin.name}?`)) return;

    approveAdmin({
      userId: admin.userId,
      queueId: admin.id,
      name: admin.name,
      email: admin.email,
    });
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Cadastro</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ação</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td className="px-6 py-4 whitespace-nowrap">{admin.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{admin.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {admin.createdAt ? new Date(admin.createdAt).toLocaleDateString('pt-BR') : "Sem data"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <button
                  onClick={() => handleApprove(admin)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  Aprovar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AvailableAdminsTable;
